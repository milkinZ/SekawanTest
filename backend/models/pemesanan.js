'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user"
      })

      this.belongsTo(models.kendaraan, {
        foreignKey: "id_kendaraan",
        as: "kendaraan"
      })
    }
  }
  pemesanan.init({
    id_pemesanan:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_driver: DataTypes.STRING,
    id_kendaraan: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    tgl_pesan: DataTypes.DATE,
    status_pemesanan: DataTypes.ENUM("diproses","disetujui")
  }, {
    sequelize,
    modelName: 'pemesanan',
    tableName: 'pemesanan'
  });
  return pemesanan;
};