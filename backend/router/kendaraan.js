const express = require("express")
const app = express()
const kendaraan = require("../models/index").kendaraan
const auth = require("../auth")
const SECRET_KEY = "INIPUNYAKASIR"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/",auth, async (req, res) => {
    kendaraan.findAll()
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

app.get("/:id",auth, async (req, res) => {
    let param = {
        id_kendaraan: req.params.id
    }
    kendaraan.findOne({ where: param })
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

app.post("/",auth, async (req, res) => {
    let data = {
        nama_kendaraan: req.body.nama_kendaraan,
        konsumsi_bbm: req.body.konsumsi_bbm,
        jadwal_service: req.body.jadwal_service,
        jenis_angkutan: req.body.jenis_angkutan,
        status_kendaraan: req.body.status_kendaraan,
    }
    kendaraan.create(data)
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

app.put("/",auth, async (req, res) => {
    let param = {
        id_kendaraan: req.body.id_kendaraan
    }
    let data = {
        nama_kendaraan: req.body.nama_kendaraan,
        konsumsi_bbm: req.body.konsumsi_bbm,
        jadwal_service: req.body.jadwal_service,
        jenis_angkutan: req.body.jenis_angkutan,
        status_kendaraan: req.body.status_kendaraan,
    }
    kendaraan.update(data, { where: param })
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

app.delete("/:id",auth, async (req, res) => {
    let param = {
        id_kendaraan: req.params.id
    }
    kendaraan.destroy({ where: param })
        .then(result => {
            res.json({
                message: "Data Berhasil Dihapus"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app