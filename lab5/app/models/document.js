const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  //_id : 
  // {
  //     type: mongoose.Schema.Types.ObjectId,
  //     index: true,
  //     required: true,
  //     auto: true,
  // },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Document', Schema);