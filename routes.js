"use strict";

module.exports = function (app) {
  const jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/tampil").get(jsonku.tampilsemuadata);

  app.route("/tampil/:id").get(jsonku.tampilById);

  app.route('/tambah').post(jsonku.tambahData);

  app.route('/edit').put(jsonku.editData);

  app.route('/hapus').delete(jsonku.hapusData);

  app.route('/tampilmatkul').get(jsonku.tampilDataMatkul);

};


