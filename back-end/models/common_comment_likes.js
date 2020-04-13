/* jshint indent: 2 */
import {Op} from "sequelize";

module.exports = function(sequelize, DataTypes) {
  const common_comment_likes =  sequelize.define('common_comment_likes', {
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
        model: 'common_comments',
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
    tableName: 'common_comment_likes'
  });

  common_comment_likes.read_like = async function(comment_id, user_id){
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

  common_comment_likes.create_like = async function(comment_id, user_id){
    let result = await this.create(
      {
        comment_id : comment_id,
        user_id : user_id
      }
    )
    return result;
  }

  common_comment_likes.delete_like = async function(comment_id, user_id){
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



  return common_comment_likes;
};
