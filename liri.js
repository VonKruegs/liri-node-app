//require("dotenv").config();
//var keys = require("./keys.js")
//var spotify = new Spotify(keys.spotify);
var moment = require ("moment");

var axios = require("axios");
//var request = require("request");

if (process.argv[2] == 'concert-this' ) {
  console.log( 'concert this');

  var artist = process.argv.slice(3).join(" ")
  console.log(artist);

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function(response) {
    // If the axios was successful...
    // Then log the body from the site! 
  
    if (response.data.length === 0) {
      console.log(artist + " is not coming anytime soon!");
    }
      
    else {var result  =  response.data[0]
      console.log(result);

      console.log("Venue name " + result.venue.name);
      console.log("Venue location " + result.venue.city);
      console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));

     };

    });

  };

//add movie spotify and the other random text function