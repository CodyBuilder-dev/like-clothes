# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
import datetime
import numpy as np
import json

import pymysql
#from keras.applications import resnet50
from tensorflow.keras.applications import resnet50
from controller.utils import get_image_array,calc_cos_sim

app = Flask(__name__)

#Load Pretrained Model
model = resnet50.ResNet50(weights='imagenet')

with open('dbinfo-temp.json') as jsonfile :
    dbinfo = json.load(jsonfile)

#Load DB image data
db = pymysql.connect(host=dbinfo['host'],
                     port=dbinfo['port'],
                     user=dbinfo['user'], 
                     passwd=dbinfo['passwd'],
                     db=dbinfo['db'],
                     charset=dbinfo['charset'])
cur = db.cursor()
sql = 'USE AI_Project'
cur.execute(sql)
sql = 'SELECT * FROM CLOTHES'
cur.execute(sql)

#Save image URL 
image_url = {}
for i in cur :
    image_url[i[0]] = "http:"+i[4]

#Save image feaure
image_feature ={}

for key,url in image_url.items() :
    image_feature[key] = model.predict(get_image_array(url))
    
@app.route("/", methods=['GET', 'POST'])
def hello() :
    return "hello"

@app.route("/ai-server", methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')

    if request.method == 'POST':
        # 이미지 경로를 전달 받습니다.
        input_url = request.form['img_url']
        # 경로로부터 이미지를 불러와 feature를 추출합니다.
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

        return render_template('index.html', 
                                best_images=best_images,
                                worst_images=worst_images)


if __name__ == '__main__':
   app.run(host='0.0.0.0',port=5000,debug = True)