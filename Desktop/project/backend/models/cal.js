'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cal.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });

    }
  }
  cal.init({
    title:{
      type:DataTypes.STRING(19999),
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
    type: DataTypes.DATE,
    allowNull: false,
    },


  }, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'Cal',
    tableName: 'cals',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  return cal;
};