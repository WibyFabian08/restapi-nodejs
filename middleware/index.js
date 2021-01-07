const express = require('express');
const auth = require('./auth');
const router = express.Router();

// daftarkan menu registrasi
router.post('/register', auth.registrasi);

router.post('/login', auth.login);

module.exports = router;