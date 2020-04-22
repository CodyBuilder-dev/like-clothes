import os
os.chdir('/home/ubuntu/ai-server')

import requests
import pymysql
import json
import numpy as np

import pandas as pd
from PIL import Image
from io import BytesIO
from tensorflow.keras.applications import resnet50

def connect_db(dbinfo_path) :
    with open(dbinfo_path) as jsonfile :
        dbinfo = json.load(jsonfile)

    connection = pymysql.connect(host=dbinfo['host'],
                         port=dbinfo['port'],
                         user=dbinfo['user'], 
                         passwd=dbinfo['passwd'],
                         db=dbinfo['db'],
                         charset=dbinfo['charset'])
    
    return connection

def get_image_array(url,fourth_dimension=True) :
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

def get_minor_category(connection,major,middle) :
    cur = connection.cursor()
    sql = "SELECT minor FROM CLOTHES_CLASS WHERE major='{}' AND middle='{}';".format(major,middle)
    cur.execute(sql)

    minor_list = []
    for minor in cur :
        minor_list.append(minor[0])

    return minor_list

def get_attribution_matrix(connection) :
    #get minor category list
    male_up = get_minor_category(connection,'남','상의')
    male_low = get_minor_category(connection,'남','바지')
    male_out = get_minor_category(connection,'남','아우터')
    female_up = get_minor_category(connection,'여','상의')
    female_out = get_minor_category(connection,'여','아우터')
    female_one = get_minor_category(connection,'여','원피스')
    female_pants = get_minor_category(connection,'여','바지')
    female_skirt = get_minor_category(connection,'여','스커트')
    female_pants.extend(female_skirt)
    female_low = female_pants

    # setup Attribution Matrix 초기화
    male_uplow = pd.read_csv('prep_data/male_uplow.csv',sep='\t',header=None)
    male_upout = pd.read_csv('prep_data/male_upout.csv',sep='\t',header=None)
    female_uplow = pd.read_csv('prep_data/female_uplow.csv',sep='\t',header=None)
    female_upout = pd.read_csv('prep_data/female_upout.csv',sep='\t',header=None)
    female_oneout = pd.read_csv('prep_data/female_oneout.csv',sep='\t',header=None)

    #인덱스 설정
    male_uplow.columns = male_up
    male_uplow.index = male_low

    male_upout.columns = male_up
    male_upout.index = male_out

    female_uplow.columns = female_up
    female_uplow.index = female_low

    female_upout.columns = female_up
    female_upout.index = female_out

    female_oneout.columns = female_one
    female_oneout.index = female_out

    return male_uplow,male_upout,female_uplow,female_upout,female_oneout