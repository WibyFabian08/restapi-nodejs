const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();


// daftarkan menu registrasi
router.post('/register', auth.registrasi);

router.post('/login', auth.login);

// alamat yang perlu auth
router.get('/halamanrahasia', verifikasi(2), auth.halamanRahasia);

module.exports = router;