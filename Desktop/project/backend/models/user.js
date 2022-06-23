'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      models.User.hasMany(models.Image, { foreignKey: 'user_id', sourceKey: 'id' });
      models.User.hasMany(models.Notice, { foreignKey: 'user_id', sourceKey: 'id' });
      models.User.hasMany(models.Reply, { foreignKey: 'notice_id', sourceKey: 'id' });
      models.User.hasOne(models.Introduction, {foreignKey: "user_id", sourceKey: 'id'});
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    pw:{
      type: DataTypes.STRING(500),
    },
    name:{
      type: DataTypes.STRING(20),
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'User',
    tableName: 'users',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  return User;
};