# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
from flask_cors import CORS

import datetime
import numpy as np
import pandas as pd
import json
import pymysql

#from keras.applications import resnet50
#from tensorflow.keras.applications import resnet50

from utils.utils_sql import connect_db, select_data_idpath, select_minor_from_id
from utils.utils_data import get_minor_onehot, get_idpath_map,get_data_dict, get_image_array, get_mmm_from_id
from utils.utils_prepdata import load_attribution_matrix,load_pickle
from utils.utils_model import load_class_model,load_feature_model
from utils.utils_recommand import calc_cos_sim,over_mean,under_mean,recommand_item
from utils.utils_classification import choose_top_class

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

config_path = 'config.json'
with open(config_path) as jsonfile :
    config = json.load(jsonfile)

#--------DB connect--------------
dbinfo_path = config["dbinfo_path"]
with open(dbinfo_path) as jsonfile :
    dbinfo = json.load(jsonfile)

try :
    db = connect_db(dbinfo_path)
    print("# DB연결 성공")
except :
    print("# DB연결 실패! 재접속")
    while True :
        db = connect_db(dbinfo_path)
        if db.open : break

cur = db.cursor()
sql = 'USE {};'.format(dbinfo['db'])
cur.execute(sql)
print("# DB 사용설정 완료")
#--------prep data load-------------
# get attribution matrix
print("# Attribution Matrix 불러오기")
prep_data_path = config["prep_data_path"]

male_uplow,male_upout,female_uplow,female_upout,female_oneout = load_attribution_matrix(db,prep_data_path)
male_lowup = male_uplow.T
male_outup = male_upout.T
female_lowup = female_uplow.T
female_outup = female_upout.T
female_outone = female_oneout.T
print("# Attribution Matrix 불러오기 완료")

# pickle 파일 불러오기
print("# pickle 파일 불러오기")
pickle_path = config["pickle_path"]
model_name = config["model_name"]
pickle_dict = load_pickle(db,pickle_path,model_name)
print("# pickle 파일 불러오기 완료")

#-----------data map load-----------
#minor_onehot 불러오기
minor_onehot,minor_onehot_dict = get_minor_onehot(db)

#id-path-map, id-url-map,id-label-map 불러오기
defected_img_url_path = config["defected_img_url_path"]
id_path_map, id_url_map,id_minor_map = get_idpath_map(db,defected_img_url_path)
x_dict,y_lael_dict = get_data_dict(id_path_map,id_minor_map,minor_onehot)



#--------classification model-----------
#Load Pretrained Model
print("# classification 모델 불러오기")
num_category = len(minor_onehot_dict)
classmodel_weight_path = config["classmodel_weight_path"]
class_model = load_class_model(num_category,classmodel_weight_path) 
print("# classification 모델 불러오기 완료")

#------------feature extraction model-------------
print("# feature 모델 불러오기")
feature_model = load_feature_model()
print("# feature 모델 불러오기 완료")

#----------------------Routing----------------------------
from routes.recommand import clothes_feature

@app.route("/ai/recommand/feature", methods=['GET', 'POST'])
def recommand_feature() :
    if request.method == 'GET':
        return render_template('clothes-feature.html')

    if request.method == 'POST':
        # form으로 날아오는지, Axios로 날아오는지 판별합니다
        input_byte = request.data
        print(input_byte)
        if len(input_byte) == 0 : # Form 데이터로 이미지 경로를 전달
            input_id = int(request.form['img_id'])
            input_url = request.form['img_url']
        else : # axios로부터 이미지 경로를 전달 받습니다  
            input_str = input_byte.decode('utf-8')
            input_dict = json.loads(input_str)
            input_id = int(input_dict['img_id'])
            input_url = input_dict['img_url']
        print("getdata 결과: ",input_id,input_url)
       
        # URL 경로로부터 이미지를 불러와 feature를 추출합니다.
        input_url = input_url.replace('http:', '')
        input_url = "http:" + input_url
        input_img = get_image_array(input_url)
        input_minor = select_minor_from_id(db,input_id)
        input_feature = feature_model.predict(input_img)
        print('[Tst]', input_minor)
        return clothes_feature(input_id,input_minor,input_feature,id_url_map,pickle_dict)


@app.route("/ai/recommand/set", methods=['GET', 'POST'])
def recommand_set() :
    if request.method == 'GET':
        return render_template('clothes-set.html')

    if request.method == 'POST':
        # form으로 날아오는지, Axios로 날아오는지 판별합니다
        input_byte = request.data
        print(input_byte)
        if len(input_byte) == 0 : # Form 데이터로 이미지 경로를 전달
            input_id = int(request.form['img_id'])
            input_url = request.form['img_url']
        else : # axios로부터 이미지 경로를 전달 받습니다  
            input_str = input_byte.decode('utf-8')
            input_dict = json.loads(input_str)
            input_id = int(input_dict['img_id'])
            input_url = input_dict['img_url']
        print("getdata 결과: ",input_id,input_url)
        
        input_major,input_middle,input_minor = get_mmm_from_id(db,input_id)

        #옷에 맞는 카테고리를 추천합니다
        male_map = {'상의':(male_uplow,male_upout),'바지':male_lowup,'아우터':male_outup}
        female_map = {'상의':(female_uplow,female_upout),'바지':female_lowup,'스커트':female_lowup,
                    '아우터':(female_outup,female_outone),'원피스':female_oneout}
        mf_map = {'남':male_map,'여':female_map}
    
        best_category  = []
        for df in mf_map[input_major][input_middle] :    
            best_category.extend(over_mean(df[input_minor]))
        
        worst_category = []
        for df in mf_map[input_major][input_middle] :    
            worst_category.extend(under_mean(df[input_minor]))

        #카테고리 내에서 적당히 2개씩 추천합니다
        best_images = {}
        for category in best_category :
            best_images.update(recommand_item(db,input_major,category))

        worst_images = {}
        for category in worst_category :
            worst_images.update(recommand_item(db,input_major,category))
             
        # return render_template('clothes-set.html',
        #                         input_url=input_url, 
        #                         best_images=best_images,
        #                         worst_images=worst_images
        #                         )
        return {"best_images":best_images,
                "worst_images":worst_images}
@app.route("/ai/classification/tag", methods=['GET', 'POST'])
def classification_tag() :
    if request.method == 'GET':
        return render_template('clothes-tag.html')

    if request.method == 'POST':
        # form으로 날아오는지, Axios로 날아오는지 판별합니다
        input_byte = request.data
        print(input_byte)
        if len(input_byte) == 0 : # Form 데이터로 이미지 경로를 전달
            #input_id = int(request.form['img_id'])
            input_url = request.form['img_url']
        else : # axios로부터 이미지 경로를 전달 받습니다  
            input_str = input_byte.decode('utf-8')
            input_dict = json.loads(input_str)
            #input_id = int(input_dict['img_id'])
            input_url = input_dict['img_url']
        print("getdata 결과: ",input_url)

        # URL 경로로부터 이미지를 불러옵니다
        input_url = "http:" + input_url
        input_img = get_image_array(input_url)
        input_result =  class_model.predict(input_img)[0] #(1,41)형태로 나오므로 인덱싱 필수

        top_class_num = 5
        tag_list = choose_top_class(input_result,minor_onehot,top_class_num)
        print(tag_list)
        best_tags = []
        for tag in tag_list :
            best_tags.append(tag[1])
        
        #return { "best_tags":best_tags }
        return render_template('clothes-tag.html',best_tags=best_tags)
@app.route("/ai/test", methods=['GET', 'POST'])
def test() :
    if request.method == 'GET':
        print()
        #return str(minor_onehot.columns)
if __name__ == '__main__':
   app.run(host='0.0.0.0',port=5000,debug = True)
