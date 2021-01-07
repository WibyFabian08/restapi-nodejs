let connection = require("../koneksi");
let mysql = require("mysql");
let md5 = require("MD5");
let response = require("../res");
let jwt = require("jsonwebtoken");
let config = require("../config/secret");
let ip = require("ip");

// controller untuk register
exports.registrasi = function (req, res) {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  let query = "SELECT email FROM ?? WHERE ?? = ?";
  let table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 0) {
        let query = "INSERT INTO ?? SET ?";
        let table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            response.ok("Berhasil Registrasi", res);
          }
        });
      } else {
        response.ok("Email Sudah Terdaftar", res);
      }
    }
  });
};

// controller login
exports.login = function (req, res) {
  let post = {
    password: req.body.password,
    email: req.body.email,
  };

  let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
  let table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });

        id_user = rows[0].id_user;

        let data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        let query = "INSERT INTO ?? SET ?";
        let table = ["akses_token"];

        query = mysql.format(query, table);

        connection.query(query, data, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              success: true,
              message: "Token JWT Tergenerate",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: "Email Atau Password Salah" });
      }
    }
  });
};
