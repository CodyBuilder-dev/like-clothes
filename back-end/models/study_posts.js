/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const study_posts = sequelize.define('study_posts', {
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
    study_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'studies',
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
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'study_posts'
  });



  study_posts.create_study_post = async function(study_id,writer, title,content, board){
    
    let result;
    try{
      result = await this.create(
        {
          study_id : study_id,
          writer : writer,
          title : title,
          content : content,
          board : board
        }
      )
      return result;
      }catch(error){
        console.log(error)
      }
    }
  
  study_posts.read_study_post = async function(post_id){
    let result;
    await this.count_view(post_id)
    result = await this.findOne(
      {
        where:
          {
            id : post_id,
          }
      }
    )
    return result;
  }


  study_posts.count_view = async function (post_id) {
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



  

  study_posts.update_study_post = async function(post_id, title, content){
    let result;
    try{
      result = await this.update(
        {
          title : title, 
          content : content
        },
        {
          where : 
          {
            id : post_id
          }
        }
      )
      return result;
    }catch(error){
      console.log(error);
    }
  }

  study_posts.delete_study_post = async function(post_id){
    let result;
    
    result = await this.destroy(
      {
        where : 
        {
          id : post_id
        }
      }
    )
    return result;
  }

  study_posts.list_study_post = async function(study_id,board, offset){
    let result;
    
    result = await this.findAll(
      { offset: Number(offset),
        limit: 10,
        where : {
          study_id : study_id,
          board : board,
        },
        order:  [['id','DESC']]
    })
    return result;
  }


  study_posts.search_study_post = async function (study_id,board, subject, word) {
    try {
      let result;
      let query = "select * from study_posts where (board = :board and study_id = :study_id) and";
      let where;
      let values = {
        board: board,
        study_id : study_id
      }
      if (subject === "content") {

        where = "(content like '%"+word+"%')";
      } else if (subject === "content&title") {
        where = "(content like '%"+word+"%' or title like '%"+word+"%')";
      } else if (subject === "writer") {
        where = "(writer like '%"+word+"%')";
      } else {
        where = "(title like '%"+word+"%')";
      }
      query += where;
      
      result = await this.sequelize.query(query, { replacements: values })
      //   result = await this.findAll(
      //     {
      //       where:
      //       {
      //         [Op.and]:
      //           [
      //             { board: board },
      //             {
      //                   subject:
      //                    {
      //                       [Op.like]: "%" + word + "%"
      //                     }
      //             }
      //           ]
      //       }
      //     }
      //   )
      
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  return study_posts;
};
