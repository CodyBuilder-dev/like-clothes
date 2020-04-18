/* jshint indent: 2 */
const { QueryTypes } = require('sequelize');
import { getSearchSql } from "../sql";

module.exports = function (sequelize, DataTypes) {
  const CLOTHES = sequelize.define('CLOTHES', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    code_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    season: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'CLOTHES'
  });

  CLOTHES.search_tags = function (tags) {
    let sql = "SELECT DISTINCT c.id, c.brand, c.code_name, c.season, c.img \
                FROM CLOTHES_AND_TAGS AS t \
                JOIN CLOTHES AS c ON t.clothes_id = c.id";

    const tag_sql = getSearchSql(tags, 'tag');
    sql = tag_sql ? sql + ' where ' + tag_sql : sql
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.search_clothes = function (payload) {
    let { tags, brands, code_names, majors, middles, minors } = payload;

    let sql = "SELECT * FROM CLOTHES_AND_CLOTHES_CLASS AS ccc  \
                LEFT JOIN CLOTHES AS c ON ccc.clothes_id=c.id  \
                LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id";

    // console.log({ tags, brands, code_names, majors, middles, minors })
    const tag_sql = getSearchSql(tags, 'tag')
    const brand_sql = getSearchSql(brands, 'brand');
    const code_name_sql = getSearchSql(code_names, 'code_name');
    const category_major_sql = getSearchSql(majors, 'major');
    const category_middle_sql = getSearchSql(middles, 'middle');
    const category_minor_sql = getSearchSql(minors, 'minor');

    let concat_sql = ''
    let search_sql = '';
    if (tag_sql) {
      sql += ' LEFT JOIN CLOTHES_AND_TAGS AS ct ON ccc.clothes_id = ct.clothes_id '
      search_sql = tag_sql
      concat_sql = ' and '
    }

    search_sql += brand_sql ? concat_sql + brand_sql : '';
    concat_sql = search_sql ? ' and ' : ''

    search_sql += code_name_sql ? concat_sql + code_name_sql : '';
    concat_sql = search_sql ? ' and ' : ''

    search_sql += category_major_sql ? concat_sql + category_major_sql : '';
    concat_sql = search_sql ? ' and ' : ''

    search_sql += category_middle_sql ? concat_sql + category_middle_sql : '';
    concat_sql = search_sql ? ' and ' : ''

    search_sql += category_minor_sql ? concat_sql + category_minor_sql : '';

    sql = search_sql ? sql + ' where ' + search_sql : sql
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_mycloset = function (user_email, in_closet) {
    let sql = "SELECT * FROM USER_AND_CLOTHES AS uc \
                LEFT JOIN CLOTHES_ITEM AS ci ON uc.clothes_item_id = ci.id \
                LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
                LEFT JOIN CLOTHES_AND_CLOTHES_CLASS AS ccc ON c.id = ccc.clothes_id \
                LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id \
                WHERE uc.user_email='" + user_email + "'";
    if (in_closet == 1) sql += " AND uc.in_closet=1";
    else if (in_closet == 0) sql += " AND uc.in_closet=0"

    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_clothes_item = function (clothes_item_id) {
    let sql = "SELECT * FROM USER_AND_CLOTHES AS uc \
                LEFT JOIN CLOTHES_ITEM AS ci ON uc.clothes_item_id = ci.id \
                LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
                LEFT JOIN CLOTHES_AND_CLOTHES_CLASS AS ccc ON c.id = ccc.clothes_id \
                LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id \
                WHERE uc.clothes_item_id=" + clothes_item_id;
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_clothes_item_tag = function (clothes_item_id) {
    let sql = "SELECT ct.tag FROM CLOTHES_ITEM AS ci \
                LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
                LEFT JOIN CLOTHES_AND_TAGS AS ct ON ci.id = ct.clothes_id";
    sql += " where ci.id=" + clothes_item_id;
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }





  return CLOTHES
};
