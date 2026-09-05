DROP DATABASE IF EXISTS db_ayik_loundry;
CREATE DATABASE db_ayik_loundry;
USE db_ayik_loundry;

CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin (username, password) VALUES ('richi', '$2b$10$38pit9fBlv2XZCjjk/8YD.EiBGd1TiQI.eoUOmY.OPyNicp9vRT1u') ON DUPLICATE KEY UPDATE id=id;

CREATE TABLE IF NOT EXISTS layanan (
    id_layanan INT AUTO_INCREMENT PRIMARY KEY,
    nama_layanan VARCHAR(100) NOT NULL,
    harga_per_kg INT NOT NULL
);

CREATE TABLE IF NOT EXISTS paket (
    id_paket INT AUTO_INCREMENT PRIMARY KEY,
    nama_paket VARCHAR(100) NOT NULL,
    durasi_jam INT NOT NULL,
    biaya_tambahan INT NOT NULL
);

CREATE TABLE IF NOT EXISTS orderan (
    id_orderan INT AUTO_INCREMENT PRIMARY KEY,
    nama_pelanggan VARCHAR(100) NOT NULL,
    berat_laundry DECIMAL(10,2) NOT NULL,
    id_layanan INT NOT NULL,
    id_paket INT NOT NULL,
    status ENUM('Diproses', 'Selesai') NOT NULL DEFAULT 'Diproses',
    waktu_masuk DATETIME NOT NULL,
    estimasi_selesai DATETIME NOT NULL,
    total_harga INT NOT NULL,
    FOREIGN KEY (id_layanan) REFERENCES layanan(id_layanan) ON DELETE RESTRICT,
    FOREIGN KEY (id_paket) REFERENCES paket(id_paket) ON DELETE RESTRICT
);
