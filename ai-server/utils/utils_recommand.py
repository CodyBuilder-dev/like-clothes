import numpy as np
from numpy import dot
from numpy.linalg import norm
import pandas as pd

from utils.utils_sql import select_set_item

def calc_cos_sim(A, B) : 
    A = A.flatten()
    B = B.flatten()
    return dot(A, B)/(norm(A)*norm(B))

def over_mean(scores:pd.Series) : 
    return scores[scores>scores.mean()].index.values

def under_mean(scores:pd.Series) :
    return scores[scores<scores.mean()].index.values

def recommand_item(connection,major,minor) :
    """
    Desc : select_set_item으로부터 받은 id,url을 dict로 만들어 반환하는 함수
    In :
        connection
        major
        minor
    Out : 
        recomman_item_dict
    """
    cur = select_set_item(connection,major,minor)
    recommand_item_dict = {}
    for id,img in cur :
        recommand_item_dict[id] = img
    return recommand_item_dict