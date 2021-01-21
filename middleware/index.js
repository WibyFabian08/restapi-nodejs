const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();


// daftarkan menu registrasi
router.post('/register', auth.registrasi);

router.post('/login', auth.login);

router.get('/verify', auth.verifikasi);

// alamat yang perlu auth
// router.get('/halamanrahasia', verifikasi(), auth.halamanRahasia);

// alamat admin tampilkan data mahasiswa
router.get('/tampilmahasiswa', verifikasi(1), auth.adminMahasiswa);

module.exports = router;