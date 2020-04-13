/* jshint indent: 2 */
import {Op} from "sequelize";

module.exports = function(sequelize, DataTypes) {
  const study_comment_likes =  sequelize.define('study_comment_likes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'study_comments',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'study_comment_likes'
  });

  study_comment_likes.read_like = async function(comment_id, user_id){
    let result = this.findOne(
      {
        where:
        {
          [Op.and] : 
            [
              {comment_id : comment_id},
              {user_id : user_id}
            ]
        }
      }
    )
    return result;
  }

  study_comment_likes.create_like = async function(comment_id, user_id){
    let result = await this.create(
      {
        comment_id : comment_id,
        user_id : user_id
      }
    )
    return result;
  }

  study_comment_likes.delete_like = async function(comment_id, user_id){
    let result = await this.destroy(
      {
        where:
        {
          [Op.and] : 
            [
              {comment_id : comment_id},
              {user_id : user_id}
            ]
        }
      }
    )
    return result;
  }

  return study_comment_likes;
};
