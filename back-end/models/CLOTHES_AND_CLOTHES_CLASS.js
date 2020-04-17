/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLOTHES_AND_CLOTHES_CLASS', {
    clothes_class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CLOTHES_CLASS',
        key: 'id'
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
    tableName: 'CLOTHES_AND_CLOTHES_CLASS'
  });
};
