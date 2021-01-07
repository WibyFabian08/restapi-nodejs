"use strict";

const response = require("./res");
const connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API Berjalan", res);
};

// get data mahasiswa
exports.tampilsemuadata = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      response.ok(rows, res);

      // response.ok(fields, res);
    }
  });
};

// menampilkan semua data berdasar id
exports.tampilById = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// menambah data
exports.tambahData = function (req, res) {
  let nama = req.body.nama;
  let nim = req.body.nim;
  let jurusan = req.body.jurusan;

  connection.query(
    "INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?, ?, ?)",
    [nim, nama, jurusan],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Data Berhasil Ditambahkan", res);
      }
    }
  );
};

// edit data
exports.editData = function (req, res) {
  let id = req.body.id_mahasiswa;
  let nama = req.body.nama;
  let nim = req.body.nim;
  let jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?",
    [nim, nama, jurusan, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Data Berhasil Diubah", res);
      }
    }
  );
};

// hapus data
exports.hapusData = function (req, res) {
  let id = req.body.id_mahasiswa;

  connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Data Brhasil Dihapus", res);
      }
    }
  );
};

// menampilkan data kuliah group
exports.tampilDataMatkul = function (req, res) {
  connection.query(
    "SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.nested(rows, res);
      }
    }
  );
};
