/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLOTHES_CLASS', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    major: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    middle: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    minor: {
      type: DataTypes.STRING(50),
      allowNull: false
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
    tableName: 'CLOTHES_CLASS'
  });
};
