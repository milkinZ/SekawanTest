import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import $ from 'jquery'
import { CSVLink } from 'react-csv';

class Pemesanan extends Component {
    constructor() {
        super()
        this.state = {
            sewa:[],
            pemesanan: [],
            kendaraan: [],
            user: [],
            nama_driver: "",
            id_kendaraan: 0,
            id_user: 0,
            tgl_pesan: "",
            status_pemesanan: "",
            token: ""
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role === "admin") {
            this.state.token = localStorage.getItem("token")
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.alert("Maaf, anda bukan admin")
            window.location = "/"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }

    getPemesanan = () => {
        let url = "http://localhost:3360/pemesanan"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pemesanan: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        window.location = '/'
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getKendaraan = () => {
        let url = "http://localhost:3360/kendaraan"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kendaraan: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        window.location = '/'
                    }
                } else {
                    console.log(error);
                }
            })
    }

    getUser = () => {
        let url = "http://localhost:3360/user/jabatan/pihak yang menyetujui"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ user: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        window.location = '/'
                    }
                } else {
                    console.log(error);
                }
            })
    }

    Add = () => {
        $("#modal_pesanan").show()
        this.setState({
            id_pemesanan: 0,
            nama_driver: '',
            id_kendaraan: 0,
            id_user: 0,
            tgl_pesan: '',
            status_pemesanan: 'diproses',
        })
    }

    savePemesanan = (event) => {
        event.preventDefault()
        $("#modal_pesanan").show()
        let sendData = {
            id_pemesanan: this.state.id_pemesanan,
            nama_driver: this.state.nama_driver,
            id_kendaraan: this.state.id_kendaraan,
            id_user: this.state.id_user,
            tgl_pesan: this.state.tgl_pesan,
            status_pemesanan: this.state.status_pemesanan,
        }
        let url = "http://localhost:3360/pemesanan"
        axios.post(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPemesanan()
            })
            .catch(error => console.log(error))
        $("#modal_pesanan").hide()
    }

    componentDidMount() {
        this.getPemesanan()
        this.getUser()
        this.getKendaraan()
        let url = "http://localhost:3360/pemesanan/sewa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ sewa: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        window.location = '/'
                    }
                } else {
                    console.log(error);
                }
            })
    }

    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    close = () => {
        $("#modal_pesanan").hide()
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    render() {
        return (
            <div className='space-y-2'>
                <Navbar />
                <div className='flex justify-between items-center m-4'>
                    <CSVLink data={this.state.sewa} filename={'laporan_pemakaian_kendaraan.csv'}>
                        <button  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Unduh Laporan</button>
                    </CSVLink>
                    <button onClick={() => this.Add()} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Tambah Pemesanan</button>
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Nama Driver
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nama Kendaraan
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Jenis Angkutan
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pihak Yang Menyetujui
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tanggal Pesan
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status Pemesanan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pemesanan.map((item) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.nama_driver}
                                    </th>
                                    <td class="px-6 py-4">
                                        {item.kendaraan.nama_kendaraan}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.kendaraan.jenis_angkutan}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.user.nama}
                                    </td>
                                    <td class="px-6 py-4">
                                        {this.convertTime(item.tgl_pesan)}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.status_pemesanan}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* MODAL */}
                <div id="modal_pesanan" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
                    <div class="flex md:h-auto w-auto justify-center ">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
                            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => this.close()}>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Tutup modal</span>
                            </button>
                            <div class="px-6 py-6 lg:px-8">
                                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sewa Kendaraan</h3>
                                <form class="space-y-6" onSubmit={(event) => this.savePemesanan(event)}>
                                    <div>
                                        <label for="nama_driver" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Driver</label>
                                        <input type="text" name="nama_driver" id="nama_driver" value={this.state.nama_driver} onChange={this.bind} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Masukkan nama driver" required />
                                    </div>
                                    <div>
                                        <label for="kendaraan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kendaraan</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" id='kendaraan' placeholder="Kendaraan" name="id_kendaraan" value={this.state.id_kendaraan} onChange={this.bind} required>
                                            <option value="">Pilih Kendaraan</option>
                                            {this.state.kendaraan.map(item => (
                                                <option value={item.id_kendaraan}>{item.id_kendaraan}: {item.nama_kendaraan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="pihak_setuju" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pihak Yang Menyetujui</label>
                                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" id='pihak_setuju' placeholder="Pihak yang Menyetujui" name="id_user" value={this.state.id_user} onChange={this.bind} required>
                                            <option value="">Pilih Pihak Yang Menyetujui</option>
                                            {this.state.user.map(item => (
                                                <option value={item.id_user}>{item.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
                                        <input
                                            onChange={this.bind}
                                            name="tgl_pesan"
                                            type="date"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Pilih Tanggal"
                                        />
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pemesanan;
