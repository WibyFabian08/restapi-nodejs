let connection = require("../koneksi");
let mysql = require("mysql");
let md5 = require("MD5");
let response = require("../res");
let jwt = require("jsonwebtoken");
let config = require("../config/secret");
let ip = require("ip");
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  host: "domain",
  service: "Gmail",
  port: 587,
  secure: true, // use SSL
  debug: true,
  auth: {
    user: "wibyfabian08@gmail.com",
    pass: "masterofcad",
  },
});

var rand, mailOptions, host, link;

// controller verifikasi email
exports.verifikasi = function (req, res) {
  console.log(req.protocol);
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    if (req.query.id == rand) {
      connection.query(
        "UPDATE user SET isVerified =? WHERE email = ?",
        [1, mailOptions.to],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Berhasil Verifikasi", res);
          }
        }
      );

      res.end("<h1>Email anda " + mailOptions.to + " telah terverifikasi</h1>");
    } else {
      res.end("<h1>Email anda " + mailOptions.to + " tidak terverifikasi</h1>");
    }
  }
};

// controller untuk register
exports.registrasi = function (req, res) {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date(),
    isVerified: 0,
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
            rand = Math.floor(Math.random() * 100 + 54);
            host = "localhost:3001";
            link = "http://" + host + "/auth/verify?id=" + rand;
            mailOptions = {
              form: "wibyfabian08@gmail.com",
              to: post.email,
              subject: "Verifikasi Email",
              html:
                "Halooo, <br> Please click tautan verifikasi berikut <br>" +
                "<a href=" +
                link +
                "> Click here to verifikasi </a>",
            };

            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.end("Error");
              } else {
                response.ok("Berhasil Registrasi", res);
                res.end("Sent");
              }
            });
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
        var token = jwt.sign(
          { rows },
          config.secret
          // , {
          // expiresIn: '300000',
          // }
        );

        let id_user = rows[0].id_user;

        let username = rows[0].username;

        let role = rows[0].role;

        // var expired = 30000;

        let isVerified = rows[0].isVerified;

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
              // tambahkan expired token
              // expires: expired,
              currUser: data.id_user,
              user: username,
              // tambah role
              role: role,
              isVerified: isVerified,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: "Email Atau Password Salah" });
      }
    }
  });
};

// cek verifikasi
exports.halamanRahasia = function (req, res) {
  response.ok("Halaman User Role 2", res);
};

// menampilkan semua data mahasiswa
exports.adminMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
