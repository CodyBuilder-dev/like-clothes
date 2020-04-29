import pickle

import pandas as pd

from utils.utils_sql import select_minor_from_mm, select_minor_id

def get_minor_category(connection,major,middle) :
    """
    Desc : major정보와 middle 정보를 받아 해당 속하는 minor list를 반환해주는 함수
    In : 
        connection
        major
        middle
    Out : minor_list = 해당 major/middle에 속하는 minor 리스트
    """
    cur = select_minor_from_mm(connection,major,middle)

    minor_list = []
    for minor in cur :
        minor_list.append(minor[0])

    return minor_list

def load_attribution_matrix(connection,prep_data_path) :
    """
    Desc : connection을 연결해, minor를 획득하고 이를 attribution matrix와 연결해주는 함수
    In :
        connection = DB connection
    Out :
        male_uplow = 남성의 상의/하의 Matrix,
        male_upout = 남성의 상의/아우터 Matrix,
        female_uplow = 여성의 상의/하의 Matrix,
        female_upout = 남성의 상의/아우터 Matrix,
        female_oneout = 여성의 원피스/아우터 Matrix
        
    """
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
    male_uplow = pd.read_csv(prep_data_path+'male_uplow.csv',sep='\t',header=None)
    male_upout = pd.read_csv(prep_data_path+'male_upout.csv',sep='\t',header=None)
    female_uplow = pd.read_csv(prep_data_path+'female_uplow.csv',sep='\t',header=None)
    female_upout = pd.read_csv(prep_data_path+'female_upout.csv',sep='\t',header=None)
    female_oneout = pd.read_csv(prep_data_path+'female_oneout.csv',sep='\t',header=None)

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

def load_pickle(connection,pickle_path,model_name="vgg19") :
    """
    Desc : 유사도 검색을 위한 카테고리별 pickle 파일 불러오기
    In :
        pickle_path = 피클파일 폴더 경로
        model_name = 피클파일 추출에 사용된 모델명
    Out : pickle_dict = minor의 id를 key로 갖는 dictionary
    """
    cur = select_minor_id(connection)
    minor_id_map  = {}
    for id,major,minor in cur :
        minor_id_map[id] = (major,minor)

    pickle_dict = {}
    for minor_id in minor_id_map :
        with open(pickle_path+model_name+'/{}.pickle'.format(minor_id), 'rb') as handle:
            pickle_dict[minor_id] = pickle.load(handle)
    return pickle_dict