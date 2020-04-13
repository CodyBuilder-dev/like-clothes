/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const tags = sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'tags'
  });

  tags.create_tag = async function(tag_name) {
    const result = await this.create({name:tag_name})
    return result
  }

  return tags;
};
