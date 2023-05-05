-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Bulan Mei 2023 pada 04.57
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sewa_kendaraan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kendaraan`
--

CREATE TABLE `kendaraan` (
  `id_kendaraan` int(11) NOT NULL,
  `nama_kendaraan` varchar(255) DEFAULT NULL,
  `konsumsi_bbm` int(11) DEFAULT NULL,
  `jadwal_service` datetime DEFAULT NULL,
  `jenis_angkutan` enum('orang','barang') DEFAULT NULL,
  `status_kendaraan` enum('sewa','properti perusahaan') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kendaraan`
--

INSERT INTO `kendaraan` (`id_kendaraan`, `nama_kendaraan`, `konsumsi_bbm`, `jadwal_service`, `jenis_angkutan`, `status_kendaraan`, `createdAt`, `updatedAt`) VALUES
(1, 'Pajero', 200, '2023-05-04 03:21:29', 'orang', 'properti perusahaan', '2023-05-04 22:21:28', '2023-05-04 22:21:28'),
(2, 'Fuso', 500, '2023-05-05 03:50:28', 'barang', 'sewa', '2023-05-05 03:50:28', '2023-05-05 03:50:28'),
(3, 'Excavator', 100, '2023-05-05 03:50:51', 'barang', 'properti perusahaan', '2023-05-05 03:50:51', '2023-05-05 03:50:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pemesanan`
--

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(11) NOT NULL,
  `nama_driver` varchar(255) DEFAULT NULL,
  `id_kendaraan` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `tgl_pesan` datetime DEFAULT NULL,
  `status_pemesanan` enum('diproses','disetujui') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pemesanan`
--

INSERT INTO `pemesanan` (`id_pemesanan`, `nama_driver`, `id_kendaraan`, `id_user`, `tgl_pesan`, `status_pemesanan`, `createdAt`, `updatedAt`) VALUES
(1, 'yanto', 1, 2, '2023-05-06 00:00:00', 'disetujui', '2023-05-04 20:23:24', '2023-05-05 01:00:40'),
(2, 'gunawan', 1, 2, '2023-05-07 00:00:00', 'disetujui', '2023-05-05 01:00:28', '2023-05-05 01:00:43'),
(3, 'hadi', 2, 2, '2023-05-05 00:00:00', 'disetujui', '2023-05-05 01:55:50', '2023-05-05 02:26:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230504082413-create-user.js'),
('20230504082858-create-kendaraan.js'),
('20230504083018-create-pemesanan.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `role` enum('admin','pihak yang menyetujui') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `nama`, `role`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', '2023-05-04 22:03:30', '2023-05-04 22:03:30'),
(2, 'budi', 'pihak yang menyetujui', 'budi', '00dfc53ee86af02e742515cdcf075ed3', '2023-05-04 22:03:30', '2023-05-04 22:03:30');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD PRIMARY KEY (`id_kendaraan`);

--
-- Indeks untuk tabel `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD PRIMARY KEY (`id_pemesanan`),
  ADD KEY `id_kendaraan` (`id_kendaraan`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  MODIFY `id_kendaraan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pemesanan`
--
ALTER TABLE `pemesanan`
  MODIFY `id_pemesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pemesanan`
--
ALTER TABLE `pemesanan`
  ADD CONSTRAINT `pemesanan_ibfk_1` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`),
  ADD CONSTRAINT `pemesanan_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
