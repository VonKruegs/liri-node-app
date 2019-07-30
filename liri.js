require("dotenv").config();
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);

var axios = require("axios");


// We then run the request with axios module on a URL with a JSON
axios.get("https://www.npmjs.com/package/node-spotify-api").then(
  function(response) {
    // Then we print out the imdbRating
    console.log(response);
  }
);
var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=[key]";
    
    console.log(queryURL); 

    axios.get(queryURL).then(
        function(bandResponse){
            console.log("Venue: " + bandResponse.data[0].venue.name);
            console.log("City: " + bandResponse.data[0].venue.city);
            console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
        }
    );
//add movie spotify and the other random text functions

