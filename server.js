'use strict';

//import exprss server build
const express = require('express');
//creat our app 
const app = express(); // we have express aplication that is ready to use 

// dotenv lets us get our secrets from our .env file
require('dotenv').config();

//  tells who is ok to send data to
const cors = require('cors');
app.use(cors());


app.get('/',homepage)

function homepage (request,response){
  response.send('Welcome to our homepage')
}
// 2. As user, I want to enter name of location so I can see data about the area.
// Create a route with a method of get and a path of /location. 
//The route callback should invoke a function to convert the search query to a latitude and longitude. 
//The function should use the provided JSON data. :)const PORT = process.env.PORT || 3001;

app.get('/location', (request, response) => {
  try{
    console.log(request.query.city);

    // call lat/long function :
    let search_query = request.query.city;
    console.log(search_query);

    let geoData = require('./data/location.json');

    let returnObj = new Location(search_query, geoData[0]);

    console.log(returnObj);

    response.json(returnObj);

  } catch(err){ //error hundler
    // Search for invalid location to confirm
    // Send status 500 and error to client
    console.log('ERROR', err);
    response.status(500).send('sorry, we messed up');
  }

})
// // A constructor function will ensure that each object is created 
// according to the same format when your server receives the external data.
// Ensure your code base uses a constructor function for this resource. 
function Location(searchQuery, obj){

 // eslint-disable-next-line camelcase
  this.search_query = searchQuery;

    // eslint-disable-next-line camelcase.
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// start the server
const PORT=3007


// 3. As user, I want to request current weather info for location entered :)
// Create route with method get and path of /weather. Use provided JSON :)

app.get('/weather', (request, response) => {
  try{


    let weatherData = require('./data/weather.json');

    let weatherArr = [];

    console.log('The weather is', weatherArr);
    weatherData.data.forEach(weatherLoop => weatherArr.push(new Weather(weatherLoop)));

    response.status(200).send(weatherArr);

  // 4. As user, I want clear messages if something goes wrong so I know to make changes or try again in different manner

  } catch(err){
    console.log('ERROR', err); // will show the error message 
// Search for invalid location to confirm
    // Send status 500 and error to client
    response.status(500).send('sorry, we messed up');
  }

})
// fallback if can't get route



function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = obj.valid_date;
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
app.get('*', (request, response) => {
  response.status(404).send('sorry, this route does not exist');
})