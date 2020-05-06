from flask import Flask, render_template, request

from utils.utils_data import get_image_array
from utils.utils_recommand import calc_cos_sim

def clothes_feature(input_minor_id,input_feature,id_url_map,pickle_dict,num):
    # 이미지의 minor id를 통해 DB이미지들과의 코사인유사도를 계산합니다
    # 이때, pickle에 존재하는 minor id만 추천이 가능합니다
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
        if(best_num >=num) : break
        best_num+=1
        best_images[key] = id_url_map[key]
    
    #낮은 유사도에서 새로운 스타일 5개를 추천합니다.
    for key,value in cos_dict.items() :
        if(worst_num >=num) : break
        worst_num+=1
        worst_images[key] = id_url_map[key]

    # 결과 렌더링
    # return render_template('clothes-feature.html', 
    #                         input_url=input_url, 
    #                         best_images=best_images,
    #                         worst_images=worst_images)
    return best_images,worst_images

def clothes_feature_list(input_minor_ids,input_ids,id_url_map,pickle_dict,num=5):
    """
    Desc : 입력으로 들어온 minor id에서 5개를 추천합니다
    
    """
    total_recommand_images = {}
    for input_id,input_minor_id in zip(input_ids,input_minor_ids) :
        # 이미 DB내 모든 이미지의 feature들은 계산이 되어 있으므로, 그냥 id로 불러오기만 함
        category_feature = pickle_dict[input_minor_id]
        cos_dict = {}
        for key in category_feature :
            cos_dict[key] = calc_cos_sim(category_feature[input_id],category_feature[key])
        
        cos_dict = {k: v for k, v in sorted(cos_dict.items(), key=lambda item: item[1])}
        cos_dict_desc = {k: v for k, v in sorted(cos_dict.items(), reverse=True , key=lambda item: item[1])}
        best_images = {}
        worst_images = {}
        worst_num = 0
        best_num = 0
        #높은 유사도를 갖는 이미지를 추천합니다    
        for key,value in cos_dict_desc.items() : #dict는 순서대로 못 뽑으므로 ㅜㅜ
            if best_num == 0 : 
                best_num+=1
                continue
            if(best_num >=num) : break
            best_num+=1
            best_images[key] = id_url_map[key]
        
        total_recommand_images.update(best_images)
    # 결과 렌더링
    # return render_template('clothes-feature.html', 
    #                         input_url=input_url, 
    #                         best_images=best_images,
    #                         worst_images=worst_images)
    return total_recommand_images