'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, {
        foreignKey: "id_user",
        as: "pemesanan"
      })
    }
  }
  user.init({
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    role: DataTypes.ENUM("admin","pihak yang menyetujui"),
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};