/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const common_comments = sequelize.define('common_comments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    writer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'common_posts',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'common_comments'
  });

  common_comments.create_comment = async function (user_id, post_id, content) {
    try {

      let result = await this.create(
        {
          writer: user_id,
          post_id: post_id,
          content: content
        }
      )
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  common_comments.read_comment = async function (post_id) {
    try {

      let query = "select common_comments.id common_comment_id, created_date, common_comments.writer, users.nickname, common_comments.content, count(common_comment_likes.comment_id) likes from common_comments join users on(common_comments.writer = users.id) left join common_comment_likes on (common_comments.id = common_comment_likes.comment_id) where post_id = :post_id group by common_comments.id;";
      let values = {
        post_id
      }

      let result = await this.sequelize.query(query, { replacements: values })
      return result[0];

    } catch (error) {
      console.log(error)
    }
  }

  common_comments.update_comment = async function (comment_id, content) {
    try {
      let result = await this.update(
        {
          content: content
        },
        {
          where: { id: comment_id }
        }
      )
      return result;

    } catch (error) {
      console.log(error)
    }
  }

  common_comments.delete_comment = async function (comment_id) {
    try {
      let result = await this.destroy(
        {
          where: { id: comment_id }
        }
      )
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  return common_comments;
}
