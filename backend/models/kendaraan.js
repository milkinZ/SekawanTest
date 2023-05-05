'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, {
        foreignKey: "id_kendaraan",
        as: "pemesanan"
      })
    }
  }
  kendaraan.init({
    id_kendaraan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_kendaraan: DataTypes.STRING,
    konsumsi_bbm: DataTypes.INTEGER,
    jadwal_service: DataTypes.DATE,
    jenis_angkutan: DataTypes.ENUM("orang", "barang"),
    status_kendaraan: DataTypes.ENUM("sewa", "properti perusahaan")
  }, {
    sequelize,
    modelName: 'kendaraan',
    tableName: 'kendaraan'
  });
  return kendaraan;
};