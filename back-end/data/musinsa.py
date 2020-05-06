import requests
import pandas as pd
import time
import json
import pymysql
import os
from bs4 import BeautifulSoup
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + '\data\crawling_config.py')
from crawling_config import config


def get_product(product_link):
    print(product_link)
    product_ = dict()
    tags_ = []
    product_idx = 0
    
    res = requests.get(product_link)
    soup = BeautifulSoup(res.content, 'html.parser')
    product = soup.select('p.product_article_contents')
    if product[product_idx].select_one('strong a') == None:
        product_idx += 1
    brand = product[product_idx].select_one('strong a').get_text().strip()
    product[product_idx].a.decompose()
    product[product_idx].span.decompose()

    product_['brand'] = brand.strip().replace('\'', '-')
    product_['code_name'] = product[product_idx].get_text().strip()
    
    product_idx += 1
    season = product[product_idx].select_one('strong')
    gender = product[product_idx].select_one('span span')
    if season == None:
        product_['season'] = 'none'
    else:
        tmp = season.get_text().split()
        season = ' '.join(tmp)
        product_['season'] = season
    
    if gender == None:
        return None
    product_['gender'] = gender.get_text()
    
    
    img = soup.select_one('div.product-img img')
    product_['img'] = img['src']
    
    tags = soup.select_one('li.article-tag-list').select('a')
    for tag in tags:
        tags_.append(tag.get_text())
    product_['tags'] = tags_
    
    categories = soup.select_one('p.item_categories').select('a')
    middle = categories[0].get_text()
    minor = categories[1].get_text()
    product_['major'] = gender.get_text()
    product_['middle'] = middle
    product_['minor'] = minor
    
    return product_


def get_items(items_url):
    items_url = items_url + '?page=' + config.page
    print(items_url)
    products = []
    res = requests.get(items_url)
    soup = BeautifulSoup(res.content, 'html.parser')
    items = soup.select('li.li_box')
    for item in items:
        product_link = config.base_url + item.select_one('a')['href']
        time.sleep(0.5)
        product = get_product(product_link)
        if product == None:
            continue
        print(product)
        append_to_json(product, config.save_json_name)
        products.append(product)
    return products

def get_clothes_category_list():
    url = 'https://store.musinsa.com'
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')

    # categories = soup.find('strong', text='인기')
    categories_area = soup.select_one('div.left_area')
    categories = categories_area.select('div.item_sub_menu a')
    category_list_url = []
    for category in categories:
        if category.span != None:
            category.span.decompose()
        category_name = category.get_text().strip()
        category_url = dict()
        category_url[category_name] = config.base_url + category['href']
        category_list_url.append(category_url)


    clothes_category_list_url = category_list_url[13:57]
    clothes_category_list = []
    for cate in clothes_category_list_url:
        if '전체' in cate.keys():
            pass
        else:
            clothes_category_list.append(cate)
    return clothes_category_list


## INSERT SQL
def get_insert_clothes_sql(brand, code_name, season, img):
    sql = """INSERT INTO CLOTHES (brand, code_name, season, img) VALUES(
    '""" + brand + """',
    '""" + code_name + """',
    '""" + season + """',
    '""" + img + """')"""
    print(sql)
    cursor.execute(sql)
    db.commit()
    return sql



def get_insert_clothes_and_tags_sql(clothes_id, tag):
    clothes_id = str(clothes_id)
    sql = """INSERT INTO CLOTHES_AND_TAGS (clothes_id, tag) VALUES(
    """ + clothes_id + """,
    '""" + tag + """')"""
    cursor.execute(sql)
    db.commit()
    return sql



def get_insert_clothes_and_clothes_class_sql(clothes_id, clothes_class_id):
    clothes_id = str(clothes_id)
    clothes_class_id = str(clothes_class_id)
    sql = """INSERT INTO CLOTHES_AND_CLOTHES_CLASS (clothes_id, clothes_class_id) VALUES(
    """ + clothes_id + """,
    """ + clothes_class_id + """)"""
    cursor.execute(sql)
    db.commit()
    return sql


def get_insert_clothes_class_sql(major, middle, minor):
    sql = """INSERT INTO CLOTHES_CLASS (major,middle, minor) VALUES(
    '""" + major + """',
    '""" + middle + """', 
    '""" + minor + """');"""
    cursor.execute(sql)
    db.commit()
    return sql


## SELECT SQL
def get_select_clothes_sql(brand, code_name, season, img):
    sql = """SELECT * FROM CLOTHES WHERE brand=
    '""" + brand + """' and code_name=
    '""" + code_name + """' and season= 
    '""" + season + """' and img=
    '""" + img + """';"""
    print(sql)
    cursor.execute(sql)
    row = cursor.fetchone()
    return row

def get_select_clothes_and_tags_sql(clothes_id, tag):
    clothes_id = str(clothes_id)
    sql = """SELECT * FROM CLOTHES_AND_TAGS WHERE clothes_id=
    """ + clothes_id + """ and tag=
    '""" + tag + """';"""

    cursor.execute(sql)
    row = cursor.fetchone()
    return row


def get_select_clothes_and_clothes_class_sql(clothes_id, clothes_class_id):
    clothes_id = str(clothes_id)
    clothes_class_id = str(clothes_class_id)
    sql = """SELECT * FROM CLOTHES_AND_CLOTHES_CLASS WHERE clothes_id=
    """ + clothes_id + """ and clothes_class_id=
    """ + clothes_class_id + """;"""
    
    cursor.execute(sql)
    row = cursor.fetchone()
    return row


def get_select_clothes_class_sql(major, middle, minor):
    sql = """SELECT * FROM CLOTHES_CLASS WHERE major=
    '""" + major + """' and middle=
    '""" + middle + """' and minor=
    '""" + minor + """';"""
    
    cursor.execute(sql)
    row = cursor.fetchone()
    return row

def insert_clothes_info(products):
    for product in products:

        clothes_class = get_select_clothes_class_sql(product['major'], product['middle'], product['minor'])
        if clothes_class == None:
            print('Update: ', product['major'], product['middle'], product['minor'])
            get_insert_clothes_class_sql(product['major'], product['middle'], product['minor'])
            clothes_class = get_select_clothes_class_sql(product['major'], product['middle'], product['minor'])
    
        clothes = get_select_clothes_sql(product['brand'], product['code_name'], product['season'], product['img'])
        if clothes == None:
            print('Update: ', product['brand'], product['code_name'], product['season'], product['img'])
            get_insert_clothes_sql(product['brand'], product['code_name'], product['season'], product['img'])
            clothes = get_select_clothes_sql(product['brand'], product['code_name'], product['season'], product['img'])
    
        clothes_id = clothes[0]
        clothes_class_id = clothes_class[0]
        clothes_and_clothes_class = get_select_clothes_and_clothes_class_sql(clothes_id, clothes_class_id)
        if clothes_and_clothes_class == None:
            print('Update: Clothes, Clotehs_class', clothes_id, clothes_class_id)
            get_insert_clothes_and_clothes_class_sql(clothes_id, clothes_class_id)
            clothes_and_clothes_class = get_select_clothes_and_clothes_class_sql(clothes_id, clothes_class_id)

        for tag in product['tags']:
            tag = tag.replace('\'', '\\\'')
            clothes_and_tags = get_select_clothes_and_tags_sql(clothes_id, tag)
            if clothes_and_tags == None:
                print("Tag Update: ", clothes_id, tag)
                get_insert_clothes_and_tags_sql(clothes_id, tag)
            
def append_to_json(_dict,path): 
    with open(path, 'ab+') as f:
        f.seek(0,2)                                #Go to the end of file    
        if f.tell() == 0 :                         #Check if file is empty
            f.write(json.dumps([_dict]).encode())  #If empty, write an array
        else :
            f.seek(-1,2)           
            f.truncate()                           #Remove the last character, open the array
            f.write(' , '.encode())                #Write the separator
            f.write(json.dumps(_dict).encode())    #Dump the dictionary
            f.write(']'.encode()) 


if __name__=='__main__':
    db = pymysql.connect(host=config.database_host, port=config.database_port, user=config.database_user, 
                     passwd=config.database_passwd, db=config.database_name, charset='utf8')
    cursor = db.cursor()
    
    clothes_category_list = get_clothes_category_list()
    for url in clothes_category_list[config.start_category:config.end_category]:
        for key, value in url.items():
            print(key)
            get_items(value)

    with open(config.save_json_name) as f:
        products = json.load(f)
    
    insert_clothes_info(products)
    