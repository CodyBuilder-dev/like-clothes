import os
os.chdir('/home/ubuntu/ai-server')

import requests
import numpy as np
import pandas as pd

from PIL import Image
from io import BytesIO

from sklearn.model_selection import train_test_split
from tensorflow.keras.applications import resnet50

from utils.utils_sql import select_data_minor, select_data_idpath, select_mmm_from_id #경로는 이 py파일을 호출한 main기준임

#-----------------------학습용 데이터 준비---------------------
def get_minor_onehot(connection) :
    """
    Desc : select_data_minor로부터 생성된 cursor로부터 onehot인코딩
    In : DB connection
    Out : Pandas Dataframe, Dict (One hot encoding)
    """
    cursor = select_data_minor(connection)
    minor_list = []
    for minor in cursor :
        minor_list.append(minor[0])
    minor_array = np.array(minor_list)

    minor_df = pd.DataFrame(minor_array)
    minor_onehot = pd.get_dummies(minor_df[0])

    minor_onehot_dict = {}
    for i in minor_onehot :
        minor_onehot_dict[i] = minor_onehot[i].to_numpy()
    
    return minor_onehot,minor_onehot_dict

def get_idpath_map(connection,defected_img_url_path='prep_data/defected_img_url.csv') :
    """
    Desc : select_data_idpath에서 생성된 cursor로부터 id-path/id-minor map을 만드는 함수
    In : DB cursor
    Out : 깨진 이미지를 제외한 정상 학습 이미지의 id_path_map,id_url_map,id_minor_map
    """

    cursor = select_data_idpath(connection)
    id_path_map = {}
    id_url_map = {}
    id_minor_map = {}

    for id,url, minor in cursor :
        id_path_map[id] = f"data/musinsa/{id}.jpg"
        id_url_map[id] = url
        id_minor_map[id] = minor
        
    # 제대로 불러와지지 않는 이미지들 제외
    defected_img = pd.read_csv(defected_img_url_path,index_col=0)
    
    #Dict는 runtime동안 non-iterable한데 억지로 del로 지워서 에러
    for defected_id in defected_img.index :
        id_path_map.pop(defected_id,None)
        id_url_map.pop(defected_id,None)
        id_minor_map.pop(defected_id,None)
        
    return id_path_map,id_url_map,id_minor_map

def get_data_dict(id_path_map,id_minor_map,minor_onehot) :
    """
    Desc : id-path/id-minor map으로부터 pandas series 획득
    In : id-path-map/id-minor-map
    Out : 
        x_dict = pandas series,
        y_label_dict = pandas series (one-hot)
    """
    x_dict = pd.Series(id_path_map)
    y_dict = pd.Series(id_minor_map)

    def load_label(minor) :
        return minor_onehot[minor].to_numpy()

    y_label_dict = {}
    for id in y_dict.index :
        y_label_dict[id] = load_label(y_dict[id])

    y_label_dict = pd.Series(y_label_dict)

    return x_dict,y_label_dict

def get_train_split(x_dict,y_label_dict,test_rate=0.1,val_rate=0.2,seed=6852) :
    """
    Desc : get_data_dict로 부터 얻어진 pandas Series를 통해 train/val/test split
    In : 
        get_idpath_map으로부터 얻은 id_path_map,id_minor_map,
        test_rate = 전체 데이터 대비 Test의 비율
        val_rate = Train 데이터 대비 Val의 비율
        seed=랜덤 추출을 위한 seed

    Out : x_train,y_train(one-hot) / x_val,y_val(one-hot) / x_test,y_test(one-hot)
    """
    
    x_temp, x_test, y_temp, y_test = train_test_split(x_dict,y_label_dict,train_size=(1-test_rate),random_state=seed)
    x_train,x_val, y_train,y_val = train_test_split(x_temp,y_temp,train_size=(1-val_rate),random_state=seed)

    return x_train,y_train, x_val,y_val, x_test,y_test

def get_mmm_from_id(connection,id) :
    cur = select_mmm_from_id(connection,id)
    for major,middle,minor in cur :
        return major,middle,minor
#-----------------이미지 데이터 처리-----------------
def get_image_array(url,fourth_dimension=True) :
    """
    Desc : image url이 직접 들어올 경우 해당 url의 image array 반환
    In :
        url = 
        forth_dimension = 모델 삽입용 4차원 변경
    """
    size=(224, 224)
    
    res = requests.get(url)
    print(res)
    image = BytesIO(res.content)
    image = Image.open(image)
    image = image.resize(size)

    image = np.array(image)
    if fourth_dimension : 
        image = np.expand_dims(image, axis=0)
        image = resnet50.preprocess_input(image) 

    return image

def load_image(image_path):
    """
    Desc : 이미지 파일시스템 경로로부터 직접 이미지 불러오기
    In : image_path
    Out : 이미지 텐서
    """
    img = tf.io.read_file(image_path)
    img = tf.image.decode_jpeg(img, channels=3)
    img = tf.image.resize(img, (224, 224))
    #img = tf.keras.applications.inception_v3.preprocess_input(img)
    return img