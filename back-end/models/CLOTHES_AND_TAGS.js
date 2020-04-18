/* jshint indent: 2 */
const { QueryTypes } = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const CLOTHES_AND_TAGS = sequelize.define('CLOTHES_AND_TAGS', {
    clothes_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CLOTHES',
        key: 'id'
      }
    },
    tag: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'CLOTHES_AND_TAGS'
  });


  return CLOTHES_AND_TAGS
};
