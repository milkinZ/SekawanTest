import React from 'react';
import Navbar from './navbar';
import Chart from "react-apexcharts";
import axios from 'axios';


class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            options: {
                chart: {
                    id: "basic-bar",
                },
                xaxis: {
                    categories: [],
                },
            },
            data: []
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

    componentDidMount() {
        axios
            .get("http://localhost:3360/pemesanan/grafik", this.headerConfig())
            .then((response) => {
                const categories = response.data.map((data) => data.nama_kendaraan);
                const values = response.data.map((data) => data.jumlah_penggunaan);

                this.setState({
                    data: [
                        {
                            name: "Value",
                            data: values,
                        },
                    ],
                    options: {
                        chart: {
                            id: "basic-bar",
                        },
                        xaxis: {
                            categories: categories,
                            labels: {
                                style: {
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "18px",
                                },
                            },
                        },
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <Navbar />
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 m-2">
                    <Chart
                        options={this.state.options}
                        series={this.state.data}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        );
    }
}

export default Dashboard;
