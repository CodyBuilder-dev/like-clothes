# -*- coding: utf-8 -*-
from flask import Flask, render_template, request
from flask_cors import CORS

import datetime
import numpy as np
import pandas as pd
import json
import pymysql

#import tensorflow as tf
#from keras.applications import resnet50
#from tensorflow.keras.applications import resnet50

from utils.utils_sql import connect_db, select_data_idpath, select_minor_from_id
from utils.utils_data import get_minor_onehot, get_idpath_map,get_data_dict, get_mmm_from_id
from utils.utils_data import get_wish_list, get_user_vector, get_user_gender, get_taste_category, get_taste_image
from utils.utils_data import get_alluser_list,get_alluser_vector
from utils.utils_data import get_image_array, load_image,load_image_fourth

from utils.utils_prepdata import load_attribution_matrix,load_pickle
from utils.utils_model import load_class_model,load_feature_model,load_cluster_model
from utils.utils_recommand import calc_cos_sim,over_mean,under_mean,recommand_item
from utils.utils_classification import choose_top_class

#-------------Flask Server Config------------------
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

config_path = 'config.json'
with open(config_path) as jsonfile :
    config = json.load(jsonfile)

#-------------DB Connect--------------
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
cur.close()
print("# DB 사용설정 완료")

#---------prep data load-------------
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
print("# minor onehot 정보 불러오기")
minor_onehot,minor_onehot_dict = get_minor_onehot(db)
print("# minor onehot 정보 불러오기 완료")

#id-path-map, id-url-map,id-label-map 불러오기
print("# id-map 정보 불러오기")
defected_img_url_path = config["defected_img_url_path"]
id_path_map, id_url_map,id_minor_map = get_idpath_map(db,defected_img_url_path)
x_dict,y_lael_dict = get_data_dict(id_path_map,id_minor_map,minor_onehot)
print("# id-map 정보 불러오기 완료")

#--------classification model-----------
print("# classification 모델 불러오기")
num_category = len(minor_onehot_dict)
classmodel_weight_path = config["classmodel_weight_path"]
class_model = load_class_model(num_category,classmodel_weight_path) 
print("# classification 모델 불러오기 완료")

#------------feature extraction model-------------
print("# feature 모델 불러오기")
feature_model = load_feature_model()
print("# feature 모델 불러오기 완료")

#------------cluster model--------------------------
#클러스터용 유저벡터 준비
alluser_list = get_alluser_list(db,num=5000)
alluser_vector_array = get_alluser_vector(db,alluser_list,minor_onehot_dict)

#모델 불러오기
print('# cluster 모델 불러오기')
cluster_model = load_cluster_model(k=6)
print('# cluster 모델 불러오기 완료')

#모델 학습
alluser_label = cluster_model.fit_predict(alluser_vector_array)

#user-label-map생성
user_label_map = pd.Series(alluser_label,index=alluser_list)

print("유저-라벨 맵 생성 완료!",user_label_map)

#----------------------Routing----------------------------
from routes.recommand import clothes_feature,clothes_feature_list

@app.route("/ai/recommand/user", methods=['GET', 'POST'])
def recommand_clothes() :
    if request.method == 'GET':
        return render_template('clothes-user.html')

    if request.method == 'POST':
        # form으로 날아오는지, Axios로 날아오는지 판별합니다
        input_byte = request.data
        print(input_byte)
        if len(input_byte) == 0 : # Form 데이터로 유저 이메일를 전달
            user_email = request.form['user_email']
        else : # axios로부터 유저 이메일를 전달 받습니다  
            input_str = input_byte.decode('utf-8')
            input_dict = json.loads(input_str)
            user_email = input_dict['user_email']
            
        print("getdata 결과: ",user_email)
        # 이메일로부터 유저의 성별을 입력받습니다
        user_gender = get_user_gender(db,user_email)

        # 이메일로부터 위시리스트 이미지 id들을 불러옵니다
        # 이때 최대 개수제한은 없습니다
        user_wish_list = get_wish_list(db,user_email)

        # 이메일로부터 유저 취향 카테고리 이름들을 불러옵니다
        user_vector = get_user_vector(db,user_email,minor_onehot_dict)
        minor_name_list = get_taste_category(user_vector,minor_onehot_dict)
        #취향분석 실패로 인해 유저 벡터로부터 minor이름을 받아오지 못한 경우 예외처리
        if(len(minor_name_list)==0) : 
                print("취향 분석이 어렵습니다. 기본 세팅된 취향으로 추천합니다.")
                if user_gender == 'F' :
                    minor_name_list = ['반팔 티셔츠','미니 스커트']
                elif user_gender == 'M' :
                    minor_name_list = ['반팔 티셔츠','데님팬츠']
                else : 
                    minor_name_list = ['반팔 티셔츠','긴팔 티셔츠']


        #취향 카테고리 이름으로부터 유저 기록내에 있는 이미지 id를 골라냅니다.
        # 이떄 성별에 맞는 값만 추출할지 어떨지 - (아직 미구현, 상의해보고 해야 함)
        #이때 최대 개수제한은 20개
        user_taste_list = get_taste_image(db,user_email,minor_name_list)
        
        # 유저를 클러스터링 한 후 같은 클러스터내 유저를 선택해,해당 유저들 취향 이미지들을 불러옵니다
        # 역시 이때 최대개수제한은 20개
        input_cluster = cluster_model.predict(user_vector.reshape(1,-1))[0]
        print("고객의 분류된 타입 : ",input_cluster)
        selected_neighbor = user_label_map[user_label_map==input_cluster].sample(1).index[0]
        print("선택된 이웃 : ", selected_neighbor)
        neighbor_list = get_taste_image(db, selected_neighbor, minor_name_list)
        # 해당 이웃의 행동기록이 없어, 이미지 id를 추천받을 수 없는 경우 예외처리
        if(len(neighbor_list) == 0) :
            print("선택된 이웃의 기록이 없어 이웃 추천이 불가능합니다.")

        # 개인정보로부터 추출된 id리스트를 처리합니다
        # 리스트를 가중치를 줘서 합친 후, 중복되는 id값들을 제거합니다
        user_total_list = user_wish_list.copy()
        user_total_list.extend(user_taste_list)
        user_total_list = list(set(user_total_list))
        total_id = user_total_list
        
        # 이웃으로부터 추출된 id리스트를 처리합니다
        # 이때 위에서 total_id와 중복되는 값은 제거합니다
        neighbor_id = list(set(neighbor_list)-set(total_id))

        # id로부터 성별정보까지 포함된 minor id을 알아냅니다
        total_minor = []
        for id in total_id : 
            total_minor.append(select_minor_from_id(db,id))

        neighbor_minor = []
        for id in neighbor_id : 
            neighbor_minor.append(select_minor_from_id(db,id))

        #옷의 id 와 minor id로부터 옷들을 추천합니다. 한 옷당 당 5개까지 추천합니다.
        total_recommand_images = clothes_feature_list(total_minor,total_id,id_url_map,pickle_dict,5)
        neighbor_recommand_images = clothes_feature_list(neighbor_minor,neighbor_id,id_url_map,pickle_dict,5)
        return {"total_recommand_images":total_recommand_images,
                "neighbor_recommand_images":neighbor_recommand_images}

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
        
        # ID로부터 이미지의 minor id를 찾아냅니다
        # 성별정보는 당연히 저장됨
        input_minor = select_minor_from_id(db,input_id)

        # URL 경로로부터 이미지를 불러와 feature를 추출합니다.
        input_url = input_url.replace('http:', '')
        input_url = "http:" + input_url
        input_img = get_image_array(input_url)
        input_feature = feature_model.predict(input_img)
        print('[Tst]', input_minor) # input_minor_id,input_feature,id_url_map,pickle_dict,num
        
        # 이미지 minor id, 이미지 feature로부터 추천받기
        best_images,worst_images = clothes_feature(input_minor,input_feature,id_url_map,pickle_dict,10)
        
        return {
        "input_url":id_url_map[input_id], 
        "best_images":best_images,
        "worst_images":worst_images
        }

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
        
        #input의 major,middle,minor name을 획득
        input_major,input_middle,input_minor = get_mmm_from_id(db,input_id)
        #남자/스커트의 경우, 잘못된 분류이므로 억지로 input_major를 여로 바꾼다
        if (input_major == "남" and input_middle == "스커트") or (input_major == "남" and input_middle == "원피스"):
            input_major = "여"
        #옷에 맞는 카테고리를 추천합니다
        male_map = {'상의':(male_uplow,male_upout),'바지':(male_lowup,male_lowup),'아우터':(male_outup,male_outup)}
        female_map = {'상의':(female_uplow,female_upout),'바지':(female_lowup,female_lowup),'스커트':(female_lowup,female_lowup),
                    '아우터':(female_outup,female_outone),'원피스':(female_oneout,female_oneout)}
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
    male_map = {'상의':(male_uplow,male_upout),'바지':(male_lowup,male_lowup),'아우터':(male_outup,male_outup)}
    female_map = {'상의':(female_uplow,female_upout),'바지':(female_lowup,female_lowup),'스커트':(female_lowup,female_lowup),
                '아우터':(female_outup,female_outone),'원피스':(female_oneout,female_oneout)}
    mf_map = {'남':male_map,'여':female_map}
    if request.method == 'GET':
        print(" Attribution Matrix 검증")
        print(male_outup['겨울 기타 코트'])
        print(type(male_outup['겨울 기타 코트']))
        print(over_mean(male_outup['겨울 기타 코트']))
        #return str(get_user_vector(db,"rena@ssafy.com",minor_onehot_dict)) #반드시 str,json등으로 보내야함
    elif request.method == 'POST' :
        test_major = request.form['major']
        test_middle = request.form['middle']
        test_minor = request.form['minor']
        
        for df in mf_map[test_major][test_middle] :    
            print(df) #df내의 row로 처리됨 ㅜㅜ
            print(type(df))
            #print(df[test_minor])
            #print(type(df[test_minor]))

        try :
            df[test_minor]
            return "df문제 없음"+test_minor
        except :
            return "df문제 발생"+test_minor
if __name__ == '__main__':
   app.run(host='0.0.0.0',port=5000,debug = True)
