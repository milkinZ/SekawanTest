const express = require("express")
const app = express()
const mysql = require("mysql")
const moment = require("moment")
const pemesanan = require("../models/index").pemesanan
const kendaraan = require("../models/index").kendaraan
const user = require("../models/index").user

const auth = require("../auth")
const SECRET_KEY = "INIPUNYAKASIR"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_kendaraan",
});

app.get("/", auth, async (req, res) => {
    pemesanan.findAll({
        include: ["user", "kendaraan"]
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/sewa", auth, async (req, res) => {
    pemesanan.findAll()
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/grafik", auth, async (req, res) => {
    conn.query(
        "SELECT kendaraan.id_kendaraan,kendaraan.nama_kendaraan, COUNT(*) AS jumlah_penggunaan FROM kendaraan JOIN pemesanan ON kendaraan.id_kendaraan = pemesanan.id_kendaraan GROUP BY kendaraan.id_kendaraan",
        (err, results, fields) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        }
    );
});

app.get("/:id", auth, async (req, res) => {
    let param = {
        id_pemesanan: req.params.id
    }
    pemesanan.findAll({
        include: ["user", "kendaraan"],
        where: param
    })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", auth, async (req, res) => {
    let data = {
        nama_driver: req.body.nama_driver,
        id_kendaraan: req.body.id_kendaraan,
        id_user: req.body.id_user,
        tgl_pesan: req.body.tgl_pesan,
        status_pemesanan: req.body.status_pemesanan
    }
    pemesanan.create(data)
        .then(result => {
            res.json({
                message: "Data Berhasil Ditambahkan",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", auth, async (req, res) => {
    let param = {
        id_pemesanan: req.body.id_pemesanan
    }
    let data = {
        status_pemesanan: req.body.status_pemesanan
    }
    pemesanan.update(data, { where: param })
        .then(result => {
            res.json({
                message: "Data Berhasil Diperbarui"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", auth, async (req, res) => {
    let param = {
        id_pemesanan: req.params.id
    }
    try {
        await detail_pemesanan.destroy({ where: param })
        await pemesanan.destroy({ where: param })
        res.json({
            message: "data berhasil dihapus"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }

})
module.exports = app