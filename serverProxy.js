const express = require('express');
const axios = require("axios");
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;
const path = require('path');

// set up server
var app = express();
app.set('port', port);

// parsing and loggin
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));


// specify the directory of static files
app.use('/', express.static(path.join(__dirname, './client/dist')));

app.get(/\/api\/summary/, (req, res) => {
  const requestTo = 'http://localhost:3002'+req.originalUrl;
  const option = {
    method: 'GET'
  };

  axios.get(requestTo, option)
    .then((resFromDB) => {
      res.jsonp(resFromDB.data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// start server
app.listen(port, () => {
  console.log('Listening on', port);
});

module.exports = app;