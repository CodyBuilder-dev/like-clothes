/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const users_and_minor_classes = sequelize.define('users_and_minor_classes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    minor_classes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'minor_classes',
        key: 'id'
      }
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'users_and_minor_classes'
  });
  return users_and_minor_classes;
};
