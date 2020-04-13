/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const users_and_studies = sequelize.define('users_and_studies', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
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
    level: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  }, {
    tableName: 'users_and_studies'
  });

  users_and_studies.join_to_study = async function(user_id, study_id, wrong_id, already_join) {
    if (wrong_id) {return {
      "state": "fail",
      "detail": "wrong id"
    }}
    else if (already_join) {return {
      "state": "fail",
      "detail": "이미 가입한 스터디입니다"
    }}
    else {
      users_and_studies.create({
        user_id, study_id
      })
      return {
        "state": "success",
        "detail": `${user_id}번 유저가 ${study_id}번 스터디에 가입하였습니다.`
      }
    }

  }

  return users_and_studies;
};
