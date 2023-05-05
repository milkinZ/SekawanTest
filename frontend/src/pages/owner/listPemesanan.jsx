import React, { Component } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import { AiOutlineCheck } from 'react-icons/ai'

class ListPemesanan extends Component {
    constructor() {
        super()
        this.state = {
            pemesanan: [],
            kendaraan: [],
            user: [],
            token: ''
        }
        let user = JSON.parse(localStorage.getItem('user'))
        if (localStorage.getItem("token") && user.role === "pihak yang menyetujui") {
            this.state.token = localStorage.getItem("token")
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.alert("Maaf, anda bukan pihak yang menyetujui")
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

    Edit = selectedItem => {
        let sendData = {
            id_pemesanan: selectedItem.id_pemesanan,
            status_pemesanan: 'disetujui'
        }
        axios.put('http://localhost:3360/pemesanan/', sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPemesanan()
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getPemesanan()
        this.getUser()
        this.getKendaraan()
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }


    render() {
        return (
            <div className='space-y-2'>
                <Navbar />
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
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
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
                                    <td>
                                        <button className="hover:bg-green-500 flex justify-center bg-green-600 text-white font-bold uppercase text-xs px-4 py-3 rounded-md shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Edit(item)}>
                                            <AiOutlineCheck />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListPemesanan;
