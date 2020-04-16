/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_RESERVATION', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'email'
      }
    },
    clothes_item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CLOTHES_ITEM',
        key: 'id'
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
      allowNull: false
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'USER_RESERVATION'
  });
};
