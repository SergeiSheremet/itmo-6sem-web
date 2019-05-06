const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      consign = require('consign'),
      config = require('./index.js'),
      database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');
      
      next();
});

consign({ cwd: 'lab5' })
      .include('app/setup')
      .then('/app/api')
      .then('/app/routes')
      .into(app);
module.exports = app;