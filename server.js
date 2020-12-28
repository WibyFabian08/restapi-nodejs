var express = require('express');
var bodyParser = require('body-parser');

var morgan = require('morgan');
var app = express();

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// panggil routes
var routes = require('./routes');
routes(app);

// daftarkan menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log('Server Started on Port 3000');
});