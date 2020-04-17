/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_AND_USER', {
    follower_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'email'
      }
    },
    following_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'email'
      }
    }
  }, {
    tableName: 'USER_AND_USER'
  });
};
