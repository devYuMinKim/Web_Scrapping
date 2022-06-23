'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Image.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
    }
  }
  Image.init({
    imgName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment:'이미지명'
    },
    imgLocate: {
      type: DataTypes.STRING(20),
    },
    imgTitle:{
      type: DataTypes.STRING(20),
    },
    imgDescription: {
      type: DataTypes.STRING(1000),
      comment:'이미지설명'
    },


  }, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'Image',
    tableName: 'images',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  return Image;
};