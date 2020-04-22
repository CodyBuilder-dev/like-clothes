import numpy as np
from numpy import dot
from numpy.linalg import norm
import pandas as pd

def calc_cos_sim(A, B):
    A = A.flatten()
    B = B.flatten()
    return dot(A, B)/(norm(A)*norm(B))

def over_mean(scores:pd.Series) :
    return scores[scores>scores.mean()].index.values

def recommand_item(connection,major,minor) :
    cur = connection.cursor()
    sql = "SELECT CLOTHES.id,CLOTHES.img FROM CLOTHES_AND_CLOTHES_CLASS \
            INNER JOIN CLOTHES ON  CLOTHES_AND_CLOTHES_CLASS.clothes_id = CLOTHES.id \
            INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id \
            WHERE CLOTHES_CLASS.major = '{}' AND CLOTHES_CLASS.minor ='{}'  \
            ORDER BY RAND() \
            LIMIT 2;".format(major,minor)
    cur.execute(sql)

    img_list = []
    for id,img in cur :
        img_list.append(img)
    return img_list