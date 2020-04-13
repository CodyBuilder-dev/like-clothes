/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const major_classes = sequelize.define('major_classes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'major_classes'
  });
  return major_classes;
};
