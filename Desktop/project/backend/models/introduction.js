'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Introduction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Introduction.belongsTo(models.User, {foreignKey: "user_id", sourceKey: "id"});
    }
  }
  Introduction.init({
    introduction: {
      type: DataTypes.STRING(20000),
    },
    name: {
      type: DataTypes.STRING(20),
    },

  }, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'Introduction',
    tableName: 'introductions',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  return Introduction;
};