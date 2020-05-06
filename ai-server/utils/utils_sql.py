import pymysql
import json
def tmp(sql):
    db = pymysql.connect(host='i02a401.p.ssafy.io', port=3306, user='root', 
                     passwd='likeclothes', db='LikeClothes', charset='utf8')
    cursor = db.cursor()
    cursor.execute(sql)
    res = cursor.fetchall()
    db.close()
    return res
#----------DB 연결--------------------
def connect_db(dbinfo_path) :
    """
    Desc : DB에 연결해 connection을 반환
    In : DB정보 파일 path
    Out : DB 커넥터 객체
    """
    with open(dbinfo_path) as jsonfile :
        dbinfo = json.load(jsonfile)

    connection = pymysql.connect(host=dbinfo['host'],
                         port=dbinfo['port'],
                         user=dbinfo['user'], 
                         passwd=dbinfo['passwd'],
                         db=dbinfo['db'],
                         charset=dbinfo['charset'])
    
    return connection

#---------------SQL 쿼리----------------------
def select_data_minor(connection) :
    """
    Desc : DB로부터 사용할 minor 카테고리 정보 획득
    (minor id 제외하고 minor name만 불러옴)
    (기능성 상/하의, 환절기 코트, 기타 브랜드, 웨이스트 백은 제외)
    (남/녀 구분 없이 동일 minor는 동일 minor로)
    In : DB connector
    Out : DB cursor with SQL result
    """
    sql = """SELECT minor FROM CLOTHES_CLASS 
    GROUP BY minor 
    HAVING minor != "기능성 상의" AND minor != "기능성 하의" AND minor != "웨이스트 백"
    AND minor NOT LIKE "(%";"""
    cur = tmp(sql)
    #print("선택된 minor개수 : ",cur.execute(sql))
    return cur

def select_data_idpath(connection) :
    """
    Desc : 사용할 minor에 포함되는 이미지데이터의 id/url/minor를 DB로부터 불러오는 함수
    In : DB connection, num = 불러올 학습 데이터 개수
    Out : DB cursor (DB전체 데이터 중 사용 minor에 포함되는 69877개의 id,url,minor 포함)
    """
    
    sql = """SELECT clothes_id,CLOTHES.img,minor FROM CLOTHES_AND_CLOTHES_CLASS 
    INNER JOIN CLOTHES ON CLOTHES.id = CLOTHES_AND_CLOTHES_CLASS.clothes_id 
    INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id
    WHERE clothes_class_id IN 
    (SELECT id FROM CLOTHES_CLASS 
    WHERE (major="남" OR major="여") 
    AND (middle != "" AND middle != "가방" AND middle!="스포츠/용품"))
    ORDER BY clothes_id ASC;"""
    cur = tmp(sql)
    # cur = connection.cursor()
    # print("선택된 data개수 : ",cur.execute(sql))
    return cur

def select_minor_from_mm(connection,major,middle) :
    """
    Desc : 해당 major/middle에 속하는 minor를 요청하는 쿼리
    In : DB connection, major, middle
    Out : DB cursor (minor이름 포함)
    """
 
    # cur = connection.cursor()
    sql = """SELECT minor FROM CLOTHES_CLASS 
    WHERE major='{}' AND middle='{}';""".format(major,middle)
    cur = tmp(sql)
    # print(major,middle,"에서 선택된 minor개수 :",cur.execute(sql))
    return cur


def select_minor_id(connection) :
    """
    Desc : 조건에 맞는 모든 minor의 id를 요청하는 쿼리
    In : DB connection
    Out : DB cursor (minor id 포함)
    """
    # cur = connection.cursor()
    sql = """SELECT clothes_class_id, major,minor 
    FROM CLOTHES_AND_CLOTHES_CLASS 
    INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id 
    GROUP BY clothes_class_id 
    HAVING (major="남" OR major="여") AND major!="아동" 
    AND minor NOT LIKE "(%" AND minor!="웨이스트 백" AND minor!="기능성 상의" AND minor!="기능성 하의";"""

    cur = tmp(sql)
    # print("선택된 minor 개수: ",cur.execute(sql))
    # print(res)
    # print([i for i in cur])
    return cur

def select_minor_from_id(connection,id) :
    """
    Desc : 이미지 id로부터 minor id를 알아냄
    In : DB connection
    Out : minor id
    """
    # cur = connection.cursor()
    #sql = """SELECT id FROM CLOTHES_CLASS 
    #INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES_CLASS.id = CLOTHES_AND_CLOTHES_CLASS.clothes_class_id
    #WHERE CLOTHES_AND_CLOTHES_CLASS.clothes_id={};""".format(id)
    sql = """SELECT clothes_class_id FROM CLOTHES_AND_CLOTHES_CLASS WHERE clothes_id={};""".format(id)
    # print("id로부터 마이너 추출 성공",cur.execute(sql))
    cur = tmp(sql)
    for minor_id in cur :
        return minor_id[0]

def select_mmm_from_id (connection,id) :
    # cur = connection.cursor()
    sql = """SELECT major,middle,minor FROM CLOTHES_CLASS
    INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES_CLASS.id = CLOTHES_AND_CLOTHES_CLASS.clothes_class_id
    WHERE CLOTHES_AND_CLOTHES_CLASS.clothes_id={};""".format(id)
    # cur.execute(sql)
    cur = tmp(sql)
    return cur
    
def select_set_item(connection,major,minor) :
    """
    Desc : major(성별),minor(소분류)를 받아, 해당 소분류 내에서 적당히 옷 2개 골라 id와 url 반환
    In :
        connection
        major
        minor
    Out : 
        id
        img
    """
    # cur = connection.cursor()
    sql = """SELECT CLOTHES.id,CLOTHES.img FROM CLOTHES_AND_CLOTHES_CLASS \
            INNER JOIN CLOTHES ON  CLOTHES_AND_CLOTHES_CLASS.clothes_id = CLOTHES.id \
            INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id \
            WHERE CLOTHES_CLASS.major = '{}' AND CLOTHES_CLASS.minor ='{}'  \
            ORDER BY RAND() \
            LIMIT 2;""".format(major,minor)
    # cur.execute(sql)
    cur = tmp(sql)
    return cur

def select_wish_url(connection,email) : 
    """
    Desc : 유저 이메일을 받아 해당 유저의 위시리스트 이미지 id 반환. 이때 minor에 속하지 않은 옷은 제외
    In :
        connection
        email
    Out :
        cursor
    """
    # cur = connection.cursor()
    sql = """SELECT CLOTHES.id FROM WISH_LIST
    INNER JOIN CLOTHES_ITEM ON WISH_LIST.clothes_item_id = CLOTHES_ITEM.id
    INNER JOIN CLOTHES ON CLOTHES_ITEM.clothes_id = CLOTHES.id
    INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES.id = CLOTHES_AND_CLOTHES_CLASS.clothes_id
    INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id
    WHERE user_email='{}'
    AND (major="남" OR major="여") 
    AND minor != "기능성 상의" AND minor != "기능성 하의" AND minor != "웨이스트 백"
    AND minor NOT LIKE "(%";""".format(email)

    # print("선택된 이미지 개수  : ",cur.execute(sql))
    cur = tmp(sql) 
    return cur

def select_user_record(connection,email) :
    """
    Desc : 유저 이메일을 받아 해당 유저의 클릭 기록 받기
    In :
        connection
        email
    Out :
        cursor
    """
    # connection.commit()
    # cur = connection.cursor()
    sql = """SELECT minor,COUNT(USER_AND_CLOTHES_RECORD.clothes_id) FROM USER_AND_CLOTHES_RECORD
        INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON USER_AND_CLOTHES_RECORD.clothes_id = CLOTHES_AND_CLOTHES_CLASS.clothes_id
        INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id
        WHERE user_email='{}'
        GROUP BY minor;""".format(email)
    
    # print("해당유저가 클릭한 마이너 카테고리 개수 : ",cur.execute(sql))
    cur = tmp(sql)
    return cur

def select_id_from_minors(connection,email,minor_name_list) :
    """
    Desc : 해당 유저가 취향선택하거나 클릭했던 user_record 테이블의 의상들 중에서
        minor list에 속하는 의상들의 id 찾아내기
        (최대 LIMIT = 20)
    In :
        connection
        email,
        minor_name_list
    Out :
        cursor
    """
    # cur = connection.cursor()
    if(len(minor_name_list)) ==1 :
        sql = """SELECT CLOTHES.id FROM USER_AND_CLOTHES_RECORD
        INNER JOIN CLOTHES ON USER_AND_CLOTHES_RECORD.clothes_id = CLOTHES.id
        INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES.id = CLOTHES_AND_CLOTHES_CLASS.clothes_id
        INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id
        WHERE user_email = '{}'
        AND minor = '{}'
        AND CLOTHES.id <60001
        ORDER BY USER_AND_CLOTHES_RECORD.updated DESC
        LIMIT 20;""".format(email,minor_name_list[0])
    else :
        sql = """SELECT CLOTHES.id FROM USER_AND_CLOTHES_RECORD
        INNER JOIN CLOTHES ON USER_AND_CLOTHES_RECORD.clothes_id = CLOTHES.id
        INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES.id = CLOTHES_AND_CLOTHES_CLASS.clothes_id
        INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id
        WHERE user_email = '{}'
        AND minor IN {}
        AND CLOTHES.id <60001
        ORDER BY USER_AND_CLOTHES_RECORD.updated DESC
        LIMIT 20;""".format(email,tuple(minor_name_list))

    # print("선택된 사용자기록 이미지 : ",cur.execute(sql))
    cur = tmp(sql)
    return cur

def select_all_user(connection,num=5000) :
    """
    Desc : 유저 전체에서 num명 선택
    In : 
        connection
        num
    Out : 
        cursor
    """
    # cur = connection.cursor()
    sql = """SELECT email FROM USER
    ORDER BY RAND()
    LIMIT {};""".format(num)
    cur = tmp(sql)
    # print("선택된 유저 수 :", cur.execute(sql))

    return cur

def select_user_gender(connection, email) : 
    """
    Desc : 유저의 이메일로부터 유저 성별 획득
    In :
        connection
        email
    Out : 
        cur
    """
    sql = """SELECT gender FROM USER WHERE email='{}';""".format(email)
    
    cur = tmp(sql)
    return cur