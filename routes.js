'use strict';

const { response } = require("express");

module.exports = function(app) {
    const jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilDataMahasiswa);

    app.route('/tampil/:id')
        .get(jsonku.tampildataBerdasarId);

    app.route('/tambah')
        .post(jsonku.tambahData);
    
    app.route('/ubah')
        .put(jsonku.editDataById);

    app.route('/hapus')
        .delete(jsonku.deleteById);

    app.route('/tampilmatakuliah')
        .get(jsonku.tampilGroupMatakuliah);

    app.route('/hapusksr')
        .delete(jsonku.deleteKsrById);

}