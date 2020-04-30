const { QueryTypes } = require('sequelize');
var fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export const getSearchSql = function (searchArray, colName) {
  if (typeof searchArray == 'undefined' || searchArray == null || searchArray == '')
    return false

  searchArray = searchArray.split(',')
  let search_sql = '( ';
  for (let i = 0; i < searchArray.length; i++) {
    if (i != searchArray.length - 1)
      search_sql += colName + '=\'' + searchArray[i] + '\' or ';
    else
      search_sql += colName + '=\'' + searchArray[i] + '\')';
  }
  return search_sql
}


export const select_data_minor = function () {
  let sql = "SELECT minor FROM CLOTHES_CLASS \
  GROUP BY minor \
  HAVING minor != '기능성 상의' AND minor != '기능성 하의' AND minor != '웨이스트 백'\
  AND minor NOT LIKE '(%';"

  return sequelize.query(sql, { type: QueryTypes.SELECT });
}

export const select_data_idpath = function () {
  let sql = "SELECT clothes_id,CLOTHES.img,minor FROM CLOTHES_AND_CLOTHES_CLASS \
  INNER JOIN CLOTHES ON CLOTHES.id = CLOTHES_AND_CLOTHES_CLASS.clothes_id \
  INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id \
  WHERE clothes_class_id IN \
  (SELECT id FROM CLOTHES_CLASS \
  WHERE (major='남' OR major='여') \
  AND (middle != '' AND middle != '가방' AND middle!='스포츠/용품')) \
  ORDER  BY clothes_id ASC;"

  return sequelize.query(sql, { type: QueryTypes.SELECT });
}

export const select_minor_from_mm = function (major,middle) {
  let sql = "SELECT minor FROM CLOTHES_CLASS \
  WHERE major='" + major + "' AND middle='" + middle + "';"
  return sequelize.query(sql, { type: QueryTypes.SELECT });
}

export const select_minor_id = function () {
  let sql = "SELECT clothes_class_id, major,minor \
  FROM CLOTHES_AND_CLOTHES_CLASS \
  INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id \
  GROUP BY clothes_class_id \
  HAVING (major='남' OR major='여') AND major!='아동' \
  AND minor NOT LIKE '(%' AND minor!='웨이스트 백' AND minor!='기능성 상의' AND minor!='기능성 하의';"
  return sequelize.query(sql, { type: QueryTypes.SELECT });
}


export const select_minor_from_id = function (id) {
  let sql ="SELECT clothes_class_id \
  FROM CLOTHES_AND_CLOTHES_CLASS WHERE clothes_id=" + id
  return sequelize.query(sql, { type: QueryTypes.SELECT });
}


export const select_mmm_from_id = function (id) {
  let sql = "SELECT major,middle,minor FROM CLOTHES_CLASS \
  INNER JOIN CLOTHES_AND_CLOTHES_CLASS ON CLOTHES_CLASS.id = CLOTHES_AND_CLOTHES_CLASS.clothes_class_id \
  WHERE CLOTHES_AND_CLOTHES_CLASS.clothes_id=" + id

  return sequelize.query(sql, { type: QueryTypes.SELECT });
}


export const select_set_item = function (major,minor) {
  let sql = "SELECT CLOTHES.id,CLOTHES.img FROM CLOTHES_AND_CLOTHES_CLASS \
  INNER JOIN CLOTHES ON  CLOTHES_AND_CLOTHES_CLASS.clothes_id = CLOTHES.id \
  INNER JOIN CLOTHES_CLASS ON CLOTHES_AND_CLOTHES_CLASS.clothes_class_id = CLOTHES_CLASS.id \
  WHERE CLOTHES_CLASS.major = '"+major+"' AND CLOTHES_CLASS.minor ='"+minor+"'  \
  ORDER BY RAND();"
  return sequelize.query(sql, { type: QueryTypes.SELECT });
}
