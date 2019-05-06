const mongoose = require('mongoose'),
      DocumentModel = require('./app/models/document');

const models = {
  Document: mongoose.model('Document')
}

module.exports = models;