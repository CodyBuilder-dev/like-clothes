/* jshint indent: 2 */
const { QueryTypes } = require('sequelize');
import { getSearchSql } from "../sql";

module.exports = function(sequelize, DataTypes) {
  const USER_RESERVATION =  sequelize.define('USER_RESERVATION', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    clothes_item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'CLOTHES_ITEM',
        key: 'id'
      }
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'USER',
        key: 'email'
      }
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '3'
    },
    reserved_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returned: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
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
    tableName: 'USER_RESERVATION'
  });


  USER_RESERVATION.read_clothes_reservation = function (signin_user_email) {
    let sql = "select ur.*, c.img FROM USER_RESERVATION AS ur \
		LEFT JOIN CLOTHES_ITEM AS ci ON ur.clothes_item_id = ci.id \
    LEFT JOIN CLOTHES AS c ON c.id = ci.clothes_id \
    WHERE user_email = '" + signin_user_email + "';";
    
    return sequelize.query(sql, { type: QueryTypes.SELECT });
  }

  return USER_RESERVATION;
};
