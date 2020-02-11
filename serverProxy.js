const express = require('express');
const axios = require("axios");
const morgan = require('morgan');
// const cors = require('cors');
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

// request for data from Albert's summary module
app.get(/\/api\/summary/, (req, res) => {
  const requestTo = 'http://18.216.204.163:3002'+req.originalUrl;
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

// request for data from Hsin's photo module
app.get('/houses', (req, res) => {
  const requestTo = 'http://18.144.88.205:3004/houses';
  const option = {
    method: 'GET'
  };

  axios.get(requestTo, option)
    .then((resFromDB) => {
      res.send(resFromDB.data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// request for data from Jialu's homevalue module
app.get('/seed', (req, res) => {
  const requestTo = 'http://18.223.108.8:3003/seed';
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

// request for data from Shreeya's neighborhood module
app.get('/listings', (req, res) => {
  const requestTo = 'http://52.53.150.79:3001/listings';
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
