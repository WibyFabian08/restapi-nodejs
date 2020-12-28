'use strict';

exports.ok = function(values, res) {
    const data = {
        'status': 200,
        'values': values,
    };

    res.json(data);
    res.end();
}

// response untuk nested matakuliah
exports.oknested = function(values, res) {
    // lakukan akumulasi
    const hasil = values.reduce((matakuliah, item) => {
        // tentukan key group
        if(matakuliah[item.nama]) {
            // buat variable group nama mahasiswa
            const group = matakuliah[item.nama];
            // cek jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)) {
                // tambahkan value ke dalam grup matkul
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        } else {
            matakuliah[item.nama] = item;
        }

        console.group('matakuliah : ', matakuliah);

        return matakuliah;
    }, {});

    const data = {
        'status': 200,
        'values': hasil
    }

    res.json(data);
    res.end();
}