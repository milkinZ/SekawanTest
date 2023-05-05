'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kendaraan', {
      id_kendaraan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_kendaraan: {
        type: Sequelize.STRING
      },
      konsumsi_bbm: {
        type: Sequelize.INTEGER
      },
      jadwal_service: {
        type: Sequelize.DATE
      },
      jenis_angkutan: {
        type: Sequelize.ENUM("orang","barang")
      },
      status_kendaraan: {
        type: Sequelize.ENUM("sewa","properti perusahaan")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kendaraan');
  }
};