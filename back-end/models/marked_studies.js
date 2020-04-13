/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const marked_studies = sequelize.define('marked_studies', {
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
    }
  }, {
    tableName: 'marked_studies'
  });

  marked_studies.mark_study = async function(user_id, study_id) {
    const marked_study = await this.findOne({where:{user_id, study_id}})

    if (marked_study) {
      this.destroy({where:{id:marked_study.id}})
      return {
        "state": "success",
        "detail": `${study_id}번 스터디 즐겨찾기 취소`
      }
    } else {
      this.create({user_id, study_id})
      return {
        "state": "success",
        "detail": `${study_id}번 스터디 즐겨찾기 등록`
      } 
    }
  }

  return marked_studies;
};
