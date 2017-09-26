const express = require('express');
const app = express();
const db = require('./db/flights.js');

app.use('/', express.static('./app/static/'));

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Types', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send(200);
});

app.get('/airlines', (req, res) => {
  var options = {};
  // var distinct = req.query.airline ? "carrier.code" : "airport.code";
  if (req.query.airline) {
    let regex = new RegExp(`.*${req.query.airline}.*`, 'i');
    options = {$or: [{"carrier.code": {$regex: regex}}, {"carrier.name": {$regex: regex}}]};
  } else if (req.query.airport) {
    let regex = new RegExp(`.*${req.query.airport}.*`, 'i');
    options = {$or: [{"airport.code": {$regex: regex}}, {"airport.name": {$regex: regex}}]};
  }
  db.Flight
    .find(options)
    // .aggregate([
    // //remove duplicates
    // ])
    .limit(10)
    .then(results => {
      res.send(200, results);
    });

});

app.get('/flightdata', (req, res) => {
  let options = {};
  if (req.query.airline !== '') { options["carrier.code"] = req.query.airline; }
  if (req.query.airport !== '') { options["airport.code"] = req.query.airport; }

  db.Flight.find(options)
    .then(results => {
      res.send(200, results);
    });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
