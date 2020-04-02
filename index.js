const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.listen(3000, () => console.log(`Listening on port ${port}`))
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const selfie = new Datastore({filename: 'selfie.db'});
selfie.loadDatabase();

app.post('/selfieApi', (req, res) => {
  // console.log(req.body);
  const data = req.body;
  const timestamp = Date.now();
  // console.log(timestamp);
  data.timestamp = timestamp;
  selfie.insert(data);
  console.log("I got a request!");
  res.json(data);
});

app.get('/selfieApi', (req, res) => {
  selfie.find({}, (err, data) =>{
    if(err){
      res.end();
      return;
    }
      res.json(data);
  });
  
});

let weather_db = new Datastore({filename: 'weather.db', autoload: true});

app.post('/weather/weatherApi', (req, res) => {
  console.log('You got a request!');
  let data = req.body;
  let timestamp = Date.now();
  data.timestamp = timestamp;
  console.log(data);
  weather_db.insert(data);

  res.json(data);
});

app.get('/weather/weatherApi', (req, res) => {
  weather_db.find({}, (err, record) => {
    // console.log(record);
    res.json(record);
  });
})

app.get('/weather/climate/:latlon', async (req, res) => {
  // console.log(req.params)
  const latlon = req.params.latlon.split(',');
  // console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  const api_key = process.env.API_KEY;
  const weather_url = await fetch(`https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`);
  const weather_data = await weather_url.json();

  const aq_url = await fetch(`https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`);
  const aq_data = await aq_url.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  };
  res.json(data);
});