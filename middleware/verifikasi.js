const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles) {
    return function(req, res, next) {
        // cek authorizzation header
        let tokenWithBearer = req.headers.authorization;

        if(tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token, config.secret, function(err, decoded) {
                if(err) {
                    return res.status(401).send({auth: false, message: "Token tidak terdaftar"});
                } else {
                    if( roles == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return res.status(401).send({auth: false, message: "gagal auth role"});
                    }
                } 
            })
        } else {
            return res.status(401).send({auth: false, message: "Token tidak tersedia"});
        }
    }
}

module.exports = verifikasi;