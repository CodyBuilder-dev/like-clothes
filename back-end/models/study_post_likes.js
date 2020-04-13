/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const study_post_likes = sequelize.define('study_post_likes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    study_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study_posts',
        key: 'id'
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    tableName: 'study_post_likes'
  });
  return study_post_likes;
};
