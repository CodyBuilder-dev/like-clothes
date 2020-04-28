import pymysql
import json
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
    (기능성 상/하의, 환절기 코트, 기타 브랜드, 웨이스트 백은 제외)
    In : DB connector
    Out : DB cursor with SQL result
    """
    cur = connection.cursor()

    sql = """SELECT minor FROM CLOTHES_CLASS 
    GROUP BY minor 
    HAVING minor != "기능성 상의" AND minor != "기능성 하의" AND minor != "웨이스트 백"
    AND minor NOT LIKE "(%";"""

    print("선택된 minor개수 : ",cur.execute(sql))
    return cur

def select_data_idpath(connection,num=60000) :
    """
    Desc : 사용할 minor에 포함되는 이미지데이터의 id/url/minor를 DB로부터 불러오는 함수
    In : DB connection, num = 불러올 학습 데이터 개수
    Out : DB cursor (Train minor에 포함된 이미지의 id,minor 포함)
    """
    
    sql = """SELECT clothes_id,CLOTHES.img,minor FROM CLOTHES_AND_CLOTHES_CLASS 
    INNER JOIN CLOTHES ON CLOTHES.id = CLOTHES_AND_CLOTHES_CLASS.clothes_id 
    INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id
    WHERE clothes_class_id IN 
    (SELECT id FROM CLOTHES_CLASS 
    WHERE (major="남" OR major="여") 
    AND (middle != "" AND middle != "가방" AND middle!="스포츠/용품")) 
    ORDER  BY clothes_id ASC 
    LIMIT {};""".format(num)

    cur = connection.cursor()
    print("선택된 data개수 : ",cur.execute(sql))
    return cur

def select_minor_from_mm(connection,major,middle) :
    """
    Desc : 해당 major/middle에 속하는 minor를 요청하는 쿼리
    In : DB connection, major, middle
    Out : DB cursor (minor이름 포함)
    """

    cur = connection.cursor()
    sql = """SELECT minor FROM CLOTHES_CLASS 
    WHERE major='{}' AND middle='{}';""".format(major,middle)

    print(major,middle,"에서 선택된 minor개수 :",cur.execute(sql))
    return cur


def select_minor_id(connection) :
    """
    Desc : 조건에 맞는 모든 minor의 id를 요청하는 쿼리
    In : DB connection
    Out : DB cursor (minor id 포함)
    """
    cur = connection.cursor()
    sql = """SELECT clothes_class_id, major,minor 
    FROM CLOTHES_AND_CLOTHES_CLASS 
    INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id 
    GROUP BY clothes_class_id 
    HAVING (major="남" OR major="여") AND major!="아동" 
    AND minor NOT LIKE "(%" AND minor!="웨이스트 백" AND minor!="기능성 상의" AND minor!="기능성 하의";"""

    print("선택된 minor 개수: ",cur.execute(sql))
    return cur

def select_minor_from_id(connection,id) :
    """
    Desc : 이미지 id로부터 minor를 DB에 요청
    In : DB connection
    Out : minor id
    """
    cur = connection.cursor()
    #sql = """SELECT id FROM CLOTHES_CLASS 
    #INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES_CLASS.id = CLOTHES_AND_CLOTHES_CLASS.clothes_class_id
    #WHERE CLOTHES_AND_CLOTHES_CLASS.clothes_id={};""".format(id)
    sql = """SELECT clothes_class_id FROM CLOTHES_AND_CLOTHES_CLASS WHERE clothes_id={};""".format(id)
    print("결과",cur.execute(sql))
    
    for minor_id in cur :
        return minor_id[0]

def select_mmm_from_id (connection,id) :
    cur = connection.cursor()
    sql = """SELECT major,middle,minor FROM CLOTHES_CLASS
    INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES_CLASS.id = CLOTHES_AND_CLOTHES_CLASS.clothes_class_id
    WHERE CLOTHES_AND_CLOTHES_CLASS.clothes_id={};""".format(id)
    cur.execute(sql)

    return cur
    
def select_set_item(connection,major,minor) :
    cur = connection.cursor()
    sql = """SELECT CLOTHES.id,CLOTHES.img FROM CLOTHES_AND_CLOTHES_CLASS \
            INNER JOIN CLOTHES ON  CLOTHES_AND_CLOTHES_CLASS.clothes_id = CLOTHES.id \
            INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id \
            WHERE CLOTHES_CLASS.major = '{}' AND CLOTHES_CLASS.minor ='{}'  \
            ORDER BY RAND() \
            LIMIT 2;""".format(major,minor)
    cur.execute(sql)

    return cur
