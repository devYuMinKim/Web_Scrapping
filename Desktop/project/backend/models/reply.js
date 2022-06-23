"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Reply.belongsTo(models.Notice, {
        foreignKey: "notice_id",
        targetKey: "id",
      });
      models.Reply.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  reply.init(
    {
      content: {
        type: DataTypes.STRING(19999),
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "Reply",
      tableName: "replys",
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return reply;
};
