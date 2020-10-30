'use strict';

//import exprss
const express = require('express');
//creat our app 
const app = express(); // we have express aplication that is ready to use 

// dotenv lets us get our secrets from our .env file
require('dotenv').config();

// bodyguard of our server - tells who is ok to send data to
const cors = require('cors');
app.use(cors());


// bring in the PORT by using process.env.variable name
const PORT = process.env.PORT || 3001;

 // we want to get the request then rspond to the request
app.get('/location', (request, response) => {
  try{
    console.log(request.query.city);
    let search_query = request.query.city;

    let geoData = require('./data/location.json');

    let returnObj = new Location(search_query, geoData[0]);

    console.log(returnObj);

    response.status(200).send(returnObj);

  } catch(err){ //error hundler
    console.log('ERROR', err);
    response.status(500).send('sorry, we messed up');
  }

})
//constructor function
function Location(searchQuery, obj){
  this.search_query = searchQuery;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// start the server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})

app.get('/weather', (request, response) => {
  try{


    let weatherData = require('./data/weather.json');

    let weatherArr = [];

    console.log('The weather is', weatherArr);
    weatherData.data.forEach(weatherLoop => weatherArr.push(new Weather(weatherLoop)));

    response.status(200).send(weatherArr);

  } catch(err){
    console.log('ERROR', err);
    response.status(500).send('sorry, we messed up');
  }

})
app.get('*', (request, response) => {
  response.status(404).send('sorry, this route does not exist');
})

function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = obj.valid_date;
}
