/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const study_comments =  sequelize.define('study_comments', {
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
        model: 'study_posts',
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
    tableName: 'study_comments'
  });


  study_comments.create_comment = async function(user_id, post_id, content){
    try{

        let result = await this.create(
        {
          writer : user_id, 
          post_id : post_id,
          content : content
        }
      )
      return result;
    }catch(error){
      console.log(error)
    }
  }

  study_comments.read_comment = async function(post_id){
    try{
      let query = "select study_comments.id study_comment_id, created_date, study_comments.writer, users.nickname, study_comments.content, count(study_comment_likes.comment_id) likes from study_comments join users on(study_comments.writer = users.id) left join study_comment_likes on (study_comments.id = study_comment_likes.comment_id) where post_id = :post_id group by study_comments.id;";
      let values = {
        post_id
      }
      
      let result = await this.sequelize.query(query, {replacements:values})
      return result[0];
    
    }catch(error){
      console.log(error)
    }
  }

  study_comments.update_comment = async function(comment_id, content){
    try{
      let result = await this.update(
        {
          content : content
        },
        {
          where : {id : comment_id}
        }
      )
      
      return result;
    }catch(error){
      console.log(error)
    }
  }

  
  study_comments.delete_comment = async function(comment_id){
    try{
        let result = await this.destroy(
        {
          where : {id : comment_id}
        }
        )
        return result;
      }catch(error){
        console.log(error)
      }
    }
    return study_comments;
  };
  