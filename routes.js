'use strict';

const { response } = require("express");

module.exports = function(app) {
    const jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);
}