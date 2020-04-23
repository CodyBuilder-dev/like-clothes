# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
from flask_cors import CORS
import datetime
import numpy as np
import pandas as pd
import json

import pymysql
#from keras.applications import resnet50
from tensorflow.keras.applications import resnet50
from controller.utils_db import get_image_array, connect_db, get_attribution_matrix
from controller.utils_recommand import calc_cos_sim,over_mean, recommand_item

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#--------image feature extraction-----------
#Load Pretrained Model
model = resnet50.ResNet50(weights='imagenet')


#Load DB image data
dbinfo_path = 'dbinfo-temp.json'
with open(dbinfo_path) as jsonfile :
    dbinfo = json.load(jsonfile)
db = connect_db(dbinfo_path)

cur = db.cursor()
sql = 'USE {};'.format(dbinfo['db'])
cur.execute(sql)
sql = 'SELECT id,img FROM CLOTHES ORDER BY id DESC LIMIT 10;'
cur.execute(sql)

#Save image URL 
image_url = {}
for id,img in cur :
    image_url[id] = "http:"+ img

#Save image feaure
image_feature ={}
for id,img in image_url.items() :
    image_feature[id] = model.predict(get_image_array(img))

#-------------set recommandation table--------------
# get attribution matrix
male_uplow,male_upout,female_uplow,female_upout,female_oneout = get_attribution_matrix(db)
male_lowup = male_uplow.T
male_outup = male_upout.T
female_lowup = female_uplow.T
female_outup = female_upout.T
female_outone = female_oneout.T

# get clothes_class map
sql = 'SELECT id,major,middle,minor FROM CLOTHES_CLASS WHERE middle!="" AND major!="아동" AND middle!="스포츠/용품" AND middle!="가방";' # \으로 개행해도 SQL 정상 동작 확인
cur.execute(sql)

clothes_class ={}
for id,major,middle,minor in cur :
    clothes_class[id] = [major,middle,minor]

clothes_class = pd.DataFrame(clothes_class)

@app.route("/ai-server/recommand/clothes-feature", methods=['GET', 'POST'])
def clothes_feature():
    if request.method == 'GET':
        return render_template('clothes-feature.html')

    if request.method == 'POST':
        # from으로 날아오는지, Axios로 날아오는지 판별합니다
        input_byte = request.data
        if len(input_byte) == 0 : # Form 데이터로 이미지 경로를 전달
            input_url = request.form['img_url']
        else : # axios로부터 이미지 경로를 전달 받습니다  
            input_str = input_byte.decode('utf-8')
            input_dict = json.loads(input_str)
            input_url = input_dict['img_url']
        print("getdata 결과: ",input_url)

        # 경로로부터 이미지를 불러와 feature를 추출합니다.
        input_url = "http:" + input_url
        input_img = get_image_array(input_url)
        input_feature = model.predict(input_img)

        # DB이미지들과의 코사인유사도를 계산합니다
        cos_dict = {}
        for key in image_feature :
            cos_dict[(key)] = calc_cos_sim(input_feature,image_feature[key])
        
        cos_dict = {k: v for k, v in sorted(cos_dict.items(), key=lambda item: item[1])}
        cos_dict_desc = {k: v for k, v in sorted(cos_dict.items(), reverse=True , key=lambda item: item[1])}
        best_images = []
        worst_images = []
        worst_num = 0
        best_num = 0
        #적당한 유사도에서 비슷한거 5개를 추천합니다    
        for key,value in cos_dict_desc.items() :
            if(best_num >=5) : break
            best_num+=1
            best_images.append(image_url[key])
        
        #낮은 유사도에서 새로운 스타일 5개를 추천합니다.
        for key,value in cos_dict.items() :
            if(worst_num >=5) : break
            worst_num+=1
            worst_images.append(image_url[key])

        return render_template('clothes-feature.html', 
                                best_images=best_images,
                                worst_images=worst_images)

@app.route("/ai-server/recommand/clothes-set", methods=['GET', 'POST'])
def clothes_set():
    if request.method == 'GET':
        return render_template('clothes-set.html')

    if request.method == 'POST':
        # from으로 날아오는지, Axios로 날아오는지 판별합니다
        input_byte = request.data
        if len(input_byte) == 0 : # Form 데이터로 이미지 경로를 전달
            input_url = request.form['img_url']
        else : # axios로부터 이미지 경로를 전달 받습니다  
            input_str = input_byte.decode('utf-8')
            input_dict = json.loads(input_str)
            input_url = input_dict['img_url']
        print("getdata 결과: ",input_url)

        # 이미지 경로로부터 id, class id, major,minor를 알아냅니다        
        cur = db.cursor()
        
        sql = "SELECT id FROM CLOTHES WHERE img='{}';".format(input_url)
        cur.execute(sql)
        for id in cur :
            input_id = id[0]
        print("입력으로 들어온 이미지 id :", input_id)

        sql = "SELECT clothes_class_id FROM CLOTHES_AND_CLOTHES_CLASS WHERE clothes_id='{}'".format(input_id)
        cur.execute(sql)
        for id  in cur :
            input_class_id = id[0]
        print("입력으로 들어온 이미지 크래스 id :", input_class_id)

        input_major = clothes_class[input_class_id][0]
        input_middle = clothes_class[input_class_id][1]
        input_minor = clothes_class[input_class_id][2]
        
        #옷에 맞는 카테고리를 추천합니다
        male_map = {'상의':(male_uplow,male_upout),'바지':male_lowup,'아우터':male_outup}
        female_map = {'상의':(female_uplow,female_upout),'바지':female_lowup,'스커트':female_lowup,
                    '아우터':(female_outup,female_outone),'원피스':female_oneout}
        mf_map = {'남':male_map,'여':female_map}
    
        best_category  = []
        for df in mf_map[input_major][input_middle] :    
            best_category.extend(over_mean(df[input_minor]))
        
        #카테고리 내에서 적당히 2개씩 추천합니다
        best_images = []
        for category in best_category :
            best_images.extend(recommand_item(db,input_major,category))
            
        return render_template('clothes-set.html',
                                input_url = input_url, 
                                best_images=best_images)

@app.route("/ai-server/recommand/dftest", methods=['GET'])
def dftest():
    if request.method == 'GET':
        print(male_uplow,male_upout,female_uplow,female_upout,female_oneout)
    return male_uplow
if __name__ == '__main__':
   app.run(host='0.0.0.0',port=5001,debug = True)