const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const user = require("./router/user")
app.use("/user", user)

const kendaraan = require("./router/kendaraan")
app.use("/kendaraan", kendaraan)

const pemesanan = require("./router/pemesanan")
app.use("/pemesanan", pemesanan)

app.listen(3360, () => {
    console.log("Server is running on port 3360")
})