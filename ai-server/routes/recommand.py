from flask import Flask, render_template, request

from utils.utils_data import get_image_array
from utils.utils_recommand import calc_cos_sim

def clothes_feature(input_id,input_minor_id,input_feature,id_url_map,pickle_dict):
    # 이미지의 카테고리를 통해 DB이미지들과의 코사인유사도를 계산합니다
    cos_dict = {}
    category_feature = pickle_dict[input_minor_id]
    for key in category_feature :
        cos_dict[key] = calc_cos_sim(input_feature,category_feature[key])
    
    cos_dict = {k: v for k, v in sorted(cos_dict.items(), key=lambda item: item[1])}
    cos_dict_desc = {k: v for k, v in sorted(cos_dict.items(), reverse=True , key=lambda item: item[1])}
    best_images = {}
    worst_images = {}
    worst_num = 0
    best_num = 0
    #높은 유사도를 갖는 5개를 추천합니다    
    for key,value in cos_dict_desc.items() : #dict는 순서대로 못 뽑으므로 ㅜㅜ
        if best_num == 0 : 
            best_num+=1
            continue
        if(best_num >=10) : break
        best_num+=1
        best_images[key] = id_url_map[key]
    
    #낮은 유사도에서 새로운 스타일 5개를 추천합니다.
    for key,value in cos_dict.items() :
        if(worst_num >=10) : break
        worst_num+=1
        worst_images[key] = id_url_map[key]

    # 결과 렌더링
    # return render_template('clothes-feature.html', 
    #                         input_url=input_url, 
    #                         best_images=best_images,
    #                         worst_images=worst_images)
    return {
        "input_url":id_url_map[input_id], 
        "best_images":best_images,
        "worst_images":worst_images
        }