/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const days = sequelize.define('days', {
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
    day: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    tableName: 'days'
  });

  
  days.create_days = async function(study_id, days) {
    if (typeof days === 'undefined') {
      return;
    }
    
    const progress_days = days.split(',');
    for (const day of progress_days) {
      this.create({study_id, day})
    }
  }

  days.read_days = async function(study_id) {
    const progress_days = await days.findAll({where:{study_id}})
        .map(day=> {
          delete day.dataValues.id          
          return day
        })
        return progress_days
    } 


  return days;
};
