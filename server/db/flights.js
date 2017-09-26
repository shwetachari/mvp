const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', () => (console.log('Error connecting db')));
db.once('open', () => (console.log('Connected to db')));

var flightSchema = mongoose.Schema({
  "airport": {
    "code": String,
    "name": String
  },
  "statistics": {
    "flights": {
      "cancelled": Number,
      "on time": Number,
      "total": Number,
      "delayed": Number,
      "diverted": Number
    },
    "# of delays": {
      "late aircraft": Number,
      "weather": Number,
      "security": Number,
      "national aviation system": Number,
      "carrier": Number
    },
    "minutes delayed": {
      "late aircraft": Number,
      "weather": Number,
      "carrier": Number,
      "security": Number,
      "total": Number,
      "national aviation system": Number
    }
  },
  "time": {
    "label": String,
    "year": Number,
    "month": Number
  },
  "carrier": {
    "code": String,
    "name": String
  }
});

var Flight = mongoose.model('Flight', flightSchema, 'airlines');

module.exports.Flight = Flight;
