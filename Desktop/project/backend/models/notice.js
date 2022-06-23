'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Notice.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });

    }
  }
  notice.init({
    title: {
      type: DataTypes.STRING(50),
    },
    postType: {
      type: DataTypes.STRING(20),
    },
    content:{
      type:DataTypes.STRING(19999),
    },


  }, {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: 'Notice',
    tableName: 'notices',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  return notice;
};