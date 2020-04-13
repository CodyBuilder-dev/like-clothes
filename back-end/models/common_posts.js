/* jshint indent: 2 */
import { Op } from "sequelize";

module.exports = function (sequelize, DataTypes) {
  const common_posts = sequelize.define('common_posts', {
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
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    board: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
    }
  }, {
    tableName: 'common_posts'
  });

  common_posts.create_common_post = async function (writer, title, content, board) {
    let result;

    result = this.create(
      {
        writer: writer,
        title: title,
        content: content,
        board: board
      }
    )
    return result;
  }

  common_posts.read_common_post = async function (post_id) {
    try {

      let result;
      await this.count_view(post_id);
      result = await this.findOne(
        {
          where:
          {
            id: post_id
          }
        }
      )
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  common_posts.count_view = async function (post_id) {
    let view_result, view_cnt = 0;

    view_result = await this.findOne(
      {
        attributes:
          [
            'view'
          ],
        where:
        {
          id: post_id
        }

      }
    )
    
    if (view_result) {
      view_cnt = (view_result.dataValues.view)+1;
      await this.update(
        {
          view: view_cnt,
        },
        {
          where:
          {
            id: post_id
          }
        }
      )
    }
  }


  common_posts.update_common_post = async function (post_id, title, content) {
    let result;

    result = await this.update(
      {
        title: title,
        content: content
      },
      {
        where:
        {
          id: post_id
        }
      }
    )
    return result;
  }

  common_posts.delete_common_post = async function (post_id) {
    let result;

    result = await this.destroy(
      {
        where:
        {
          id: post_id
        }
      }
    )
    return result;
  }

  common_posts.list_common_post = async function (board) {
    let result;
    try {
      result = await this.findAll(
        {
          where:
          {
            board: board
          }
        }
      )
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  common_posts.search_common_post = async function (board, subject, word) {
    try {
      let result;
      let query = "select * from common_posts where board = :board and ";
      let where;
      let values = {
        board: board
      }
      if (subject === "content") {

        where = "(content like '%" + word + "%')";
      } else if (subject === "content&title") {
        where = "(content like '%" + word + "%' or title like '%" + word + "%')";
      } else if (subject === "writer") {
        where = "(writer like '%" + word + "%'";
      } else {
        where = "title like '%" + word + "%'";
      }
      query += where;

      result = await this.sequelize.query(query, { replacements: values })
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }


  return common_posts;
}


