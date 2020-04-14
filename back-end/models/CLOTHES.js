/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLOTHES', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    use: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
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
    tableName: 'CLOTHES'
  });
};
