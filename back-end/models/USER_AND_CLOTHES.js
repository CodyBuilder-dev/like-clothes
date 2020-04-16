/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_AND_CLOTHES', {
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'email'
      }
    },
    clothes_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CLOTHES',
        key: 'id'
      }
    },
    in_closet: {
      type: DataTypes.INTEGER(1),
      allowNull: false
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
    tableName: 'USER_AND_CLOTHES'
  });
};
