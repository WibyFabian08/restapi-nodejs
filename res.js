// menangkap response API
"use strict";

// menangkap response API
exports.ok = function (values, res) {
  const data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
};

// response untuk nested
exports.nested = function (values, res) {
  // lakukan akumulasi
  const hasil = values.reduce((akumulasi, item) => {
    // tentukan key group
    if (akumulasi[item.nama]) {
      // buat variabel grup nama mahasiswa
      const group = akumulasi[item.nama];
      // cek jika isi aray adalah matakuliah
      if (Array.isArray(group.matakuliah)) {
        // tambahkan value kedalam group matakuliah
        group.matakuliah.push(item.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, item.matakuliah];
      }
    } else {
      akumulasi[item.nama] = item;
    }

    return akumulasi;
  }, {});

  const data = {
    status: 200,
    values: hasil,
  };

  res.json(data);
  res.end();
};
