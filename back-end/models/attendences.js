/* jshint indent: 2 */
import { Op } from "sequelize";

module.exports = function (sequelize, DataTypes) {

  const attendences = sequelize.define('attendences', {
    study_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'attendences'
  });

  attendences.read_today_attendence = async function (study_id, user_id, date) {

    try {
      let result;

      result = await this.findAll(
        {
          where:
          {
            [Op.and]:
              [
                { study_id: study_id },
                { user_id: user_id },
                { date: date }
              ]
          }
        }
      )

      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  attendences.read_attendence = async function (study_id, user_id) {
    try {
      let result;
      result = await this.findAll(
        {
          where:
          {
            [Op.and]:
              [
                { study_id: study_id },
                { user_id: user_id }
              ]
          }
        }
      )

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  attendences.create_attendence = async function (study_id, user_id) {
    try {
      let result;
      result = await this.create(
        {
          study_id: study_id,
          user_id: user_id
        }
      )
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  return attendences;
};
