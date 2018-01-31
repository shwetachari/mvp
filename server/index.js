const express = require('express');
const app = express();
const db = require('./db/flights.js');
const Swagger = require('swagger-client');
const apikey = require('./config.js');
const request = require('request');
const cors = require('cors');

app.use(cors({credentials: true, origin: true}));
app.use('/', express.static('./app/static/'));

app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Types', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send(200);
});

app.get('/airlines', (req, res) => {
  var options = {};
  if (req.query.airline) {
    let regex = new RegExp(`.*${req.query.airline}.*`, 'i');
    options = {$or: [{"carrier.code": {$regex: regex}}, {"carrier.name": {$regex: regex}}]};
  } else if (req.query.airport) {
    let regex = new RegExp(`.*${req.query.airport}.*`, 'i');
    options = {$or: [{"airport.code": {$regex: regex}}, {"airport.name": {$regex: regex}}]};
  }
  db.Flight
    .find(options)
    .limit(15)
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

app.get('/findflights', (req, res) => {
  Swagger.http({
    url: 'https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search',
    query: {
      apikey: apikey.apikey,
      origin: req.query.airport
    },
    method: 'GET',
  }).then((results) => {
      res.send(results.body.results.slice(0,50));
    })
    .catch(err => {
      console.log('Error fetching flight data', err);
    })

    /*
    .then((results) => {
        return results.body.results.slice(0,50)
      })
      .then((results) => {
        results.forEach((result) => {
          Swagger.http({
            url: 'https://api.sandbox.amadeus.com/v1.2/airports/autocomplete',
            query: {
              apikey: apikey.apikey,
              term: result.destination
            },
            method: 'GET',
          })
          .then(airportRes => {
            result['destination_name'] = airportRes.body[0].label;
          })
        })
        return results;
      })
      .then(results => {
        res.send(results);
      })
    */
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
