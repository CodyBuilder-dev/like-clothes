/* jshint indent: 2 */
import { Op } from "sequelize";

module.exports = function (sequelize, DataTypes) {
  const study_post_files = sequelize.define('study_post_files', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study_posts',
        key: 'id'
      }
    },
    file_url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'study_post_files'
  });

  return study_post_files;
}


