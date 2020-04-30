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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code_name: {
      type: DataTypes.STRING(100),
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
    
    if (tag_sql) sql = sql + ' WHERE ' + tag_sql
    else return []    
    
    sql = sql + ' LIMIT 200'; 
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

    sql = search_sql ? sql + ' WHERE ' + search_sql : sql
    sql = sql + ' LIMIT 200';
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_clothes_items_in_wish_list = function (user_email) {
    let sql = "SELECT * FROM WISH_LIST AS wl \
                LEFT JOIN CLOTHES_ITEM AS ci ON wl.clothes_item_id = ci.id \
                LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
                LEFT JOIN CLOTHES_AND_CLOTHES_CLASS AS ccc ON c.id = ccc.clothes_id \
                LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id \
                WHERE wl.user_email='" + user_email + "'";

    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  // 옷장 -> 상세 이므로 .... <상세로 갈 수 있는 아이디>와 img url, 옷 기본 정보(code_name, brand) 는 추가적으로 있으면 좋을거 같아여!!!!!!!!!!!

  CLOTHES.read_clothes_items_in_closet = function (user_email) {
    let sql = "SELECT ci.*, c.brand, c.code_name, c.img  FROM CLOTHES_ITEM AS ci \
	              LEFT JOIN USER AS u ON ci.owner_email = u.email \
                LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
                LEFT JOIN CLOTHES_AND_CLOTHES_CLASS AS ccc ON c.id = ccc.clothes_id \
	              LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id \
                WHERE ci.owner_email='" + user_email + "'";

    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_clothes_item = function (clothes_item_id, signin_user) {
    let sql;
    if (typeof signin_user === 'undefined') {
      sql = "SELECT ci.clothes_id, ci.owner_email, ci.color, ci.description, ci.size, ci.length, ci.shoulder, ci.waist, \
        cc.major, cc.middle, cc.minor, c.img, c.code_name, c.brand, c.season, u.profile_img, u.nickname, ci.id, cc.major as 'gender'  \
        FROM CLOTHES_ITEM AS ci \
        LEFT JOIN USER AS u ON ci.owner_email = u.email \
        LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
        LEFT JOIN CLOTHES_AND_CLOTHES_CLASS AS ccc ON c.id = ccc.clothes_id \
        LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id \
        WHERE ci.id=" + clothes_item_id;
      
    } else {
      const signin_user_email = signin_user.email
      sql = "SELECT distinct ci.clothes_id, ci.owner_email, ci.color, ci.description, ci.size, ci.length, ci.shoulder, ci.waist, \
      cc.major, cc.middle, cc.minor, c.img, c.code_name, c.brand, c.season, u.profile_img, u.nickname, ci.id, cc.major as 'gender', \
      case when wl.clothes_item_id != null then 'true' else 'false' end in_wishlist, \
      case when ur.clothes_item_id != null then 'true' else 'false' end in_reservation \
      FROM CLOTHES_ITEM AS ci \
      LEFT JOIN USER AS u ON ci.owner_email = u.email \
      LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
      LEFT JOIN CLOTHES_AND_CLOTHES_CLASS AS ccc ON c.id = ccc.clothes_id \
      LEFT JOIN CLOTHES_CLASS AS cc ON ccc.clothes_class_id = cc.id \
      LEFT JOIN WISH_LIST AS wl ON wl.user_email = '"+ signin_user_email + "' and wl.clothes_item_id = ci.id \
      LEFT JOIN USER_RESERVATION AS ur ON ur.user_email = '" + signin_user_email + "' and ur.clothes_item_id = ci.id \
      WHERE ci.id=" + clothes_item_id;
      
    }

    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_clothes_item_tag = function (clothes_item_id) {
    let sql = "SELECT ct.tag FROM CLOTHES_ITEM AS ci \
                LEFT JOIN CLOTHES AS c ON ci.clothes_id = c.id \
                LEFT JOIN CLOTHES_AND_TAGS AS ct ON c.id = ct.clothes_id";
    sql += " where ci.id=" + clothes_item_id;
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  CLOTHES.read_random_clothes = function () {
    let sql = "SELECT * FROM CLOTHES \
                ORDER BY RAND() LIMIT 8 ";
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }



  return CLOTHES
};
