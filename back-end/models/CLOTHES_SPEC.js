/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLOTHES_SPEC', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    color: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    size: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    length: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    shoulder: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    waist: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'CLOTHES_SPEC'
  });
};
