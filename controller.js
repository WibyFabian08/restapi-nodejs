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

// post data 
exports.tambahData = function(req, res) { 
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    
    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)', [nim, nama, jurusan], function(error, rows, fields) {
        if(error){
            console.log(error);
        } else {
            response.ok("Data berhasil ditambahkan", res);
        }
    });
}

// put data
exports.editDataById = function(req, res) { 
    const id = req.body.id_mahasiswa;
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;
    
    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id], function(error, rows, fields) {
        if(error){
            console.log(error);
        } else {
            response.ok("Data berhasil Diubah", res);
        }
    });
}

// delete
exports.deleteById = function(req, res) { 
    const id = req.body.id_mahasiswa;
    
    connection.query('DELETE from mahasiswa WHERE id_mahasiswa=?', [id], function(error, rows, fields) {
        if(error){
            console.log(error);
        } else {
            response.ok("Data berhasil Dihapus", res);
        }
    });
}

// menampilkan matakuliah group
exports.tampilGroupMatakuliah = function(req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM ksr JOIN matakuliah JOIN mahasiswa WHERE ksr.id_matakuliah = matakuliah.id_matakuliah AND ksr.id_mahasiswa = mahasiswa.id_mahasiswa', function(err, rows, fields) {
        if(err) {
            console.log(err);
        } else {
            response.oknested(rows, res);
        }
    })
}
