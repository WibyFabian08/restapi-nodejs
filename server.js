// cara membuat server dengan node js
const express = require("express");
const bodyParser = require("body-parser");

const morgan = require('morgan');
const app = express();
const cors = require('cors');

// parse application / json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// memanggil routes
const routes = require("./routes");
routes(app);

// daftarkan menu routes dari middleware
app.use('/auth', require('./middleware'));

app.listen(3001, () => {
  console.log("Sever Starter on Port 3001");
});
