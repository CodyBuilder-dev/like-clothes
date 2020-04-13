/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const applies = sequelize.define('applies', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    study_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'studies',
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
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'applies'
  });


  applies.create_apply = async function(wrong_id, data) {
    const user_id = data.user_id
    const study_id = data.study_id

    const apply = await this.findOne({where:{user_id, study_id}})
    if (apply) {return {
      "state": "fail",
      "detail": "이미 가입신청한 스터디입니다"
  }}
    else {
      if (wrong_id) {return {
      "state": "fail",
      "detail": "wrong id"
  }}
      else {
        this.create(data)
        return {
          "state": "success",
          "detail": `${user_id}번 유저가 ${study_id}번 스터디에 가입신청 하였습니다`
      }
      }
    }
  }

  applies.delete_apply = async function(apply_id, user_id) {
    const apply = await this.findOne({where:{id:apply_id}})
    if (!apply) {return {
      "state": "fail",
      "detail": "wrong id"
  }}
    else {

      if (apply.user_id != user_id) {return {
        "state": "fail",
        "detail": `작성자가 아닙니다`
      }} else {
      this.destroy({where: {id:apply_id}})
      return {
        "state": "success",
        "detail": `${apply_id}번 지원 삭제완료`
    }}
  }
  }

  applies.update_apply = async function(apply_id, data, user_id) {
    const apply = await this.findOne({where:{id:apply_id}})
    if (!apply) {return {
      "state": "fail",
      "detail": "wrong id"
  }}
    else {
      if (apply.user_id != user_id) {return {
        "state": "fail",
        "detail": `작성자가 아닙니다`
      }} else {
      this.update(data, {where:{id:apply_id}})
      return {
        "state": "success",
        "detail": `${apply_id}번 신청을 수정하였습니다.`
      }}
    }    
  }

  applies.read_apply = async function(apply_id) {
    const apply = await this.findOne({where:{id:apply_id}})
    return apply
  }
  return applies;
};
