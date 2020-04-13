/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const studies_and_tags = sequelize.define('studies_and_tags', {
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
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    }
  }, {
    tableName: 'studies_and_tags'
  });

  studies_and_tags.create_study_tag = async function(study_id, tag_id) {
    this.create({study_id, tag_id})
  }

  return studies_and_tags;
};
