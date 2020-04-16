/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {

const users = sequelize.define('USER', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    phone_num: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    profile_img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    rank: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'bronze'
    },
    coupon: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    bank_account: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    credit_card: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'USER'
  });

  return users;
};
