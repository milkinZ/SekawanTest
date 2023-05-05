'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanan', {
      id_pemesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_driver: {
        type: Sequelize.STRING
      },
      id_kendaraan: {
        type: Sequelize.INTEGER,
        references:{
          model:"kendaraan",
          key:"id_kendaraan"
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:"user",
          key:"id_user"
        }
      },
      tgl_pesan: {
        type: Sequelize.DATE
      },
      status_pemesanan: {
        type: Sequelize.ENUM("diproses","disetujui")
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
    await queryInterface.dropTable('pemesanan');
  }
};