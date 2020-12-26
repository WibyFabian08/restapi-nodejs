'use strict';

const response = require('./res');
const connection = require('./koneksi');

exports.index = function(req, res) {
    response.ok('Aplikasi Rest API Berjalan', res);
}

// get data semua mahasiswa
exports.tampilDataMahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if(error){
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

// get data berdasar id
exports.tampildataBerdasarId = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], function(error, rows, fields) {
        if(error){
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}