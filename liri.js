require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var moment = require ("moment");
var axios = require("axios");
var fs = require("fs")

var command = process.argv[2]

//make sure to add function for OMDB as well as the liri if statement "movie-this"




if (command === "do-what-it-says"){
  // grab the actual command
  fs.readFile("random.txt", "utf-8", function(error,data){
    var dataArr = data.split(",");
    runCommand(dataArr[0],dataArr[1]);

  }
  )
  // grab the search term from file
}

else{
  var searchTerm = process.argv.slice(3).join(" ")
  runCommand(command, searchTerm)

}

function runCommand(command, searchTerm){
  if (command === "concert-this"){
    concertThis(searchTerm)
  }
  
  else if(command === "spotify-this-song"){
    spotifyThis(searchTerm)
  }
  
  else if (command === "movie-this"){

    movieThis(searchTerm)
    console.log(searchTerm);

  }
  

}

function concertThis(artist){

  console.log( 'concert this');

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
  
function spotifyThis(song) {

  //console.log(keys.spotify)
  var spotify = new Spotify(keys.spotify);

   
  spotify.search({ type: 'track', query: song})
    .then(function(response) {
      for(var i=0; i < response.tracks.items.length; i++) {
        var song = response.tracks.items[i]
      console.log(song.artists[0].name);
      console.log(song.preview_url)
      console.log(song.name)
      console.log(song.album.name)

      console.log("\n====================================\n")

      }

    })
    .catch(function(err) {
      console.log(err);
    });
};
function movieThis(title){

  if (title.length = 0) {
    title === "Mr. Nobody";
    console.log(title);
  }

  console.log( 'movie this');
  console.log(title.length);

  var key = (keys.omdbKey);

  var queryURL = ("http://www.omdbapi.com/?apikey=" + key + "&t=" + title);

  axios.get(queryURL).then(function(response) {

    console.log(response);

      var movie = response.data
    // Then we print out the imdbRating
    console.log("Movie Title: " + movie.Title);
    console.log("Year of Movie: " + movie.Year);
    console.log("IMDB Rating: " + movie.imdbRating);
    console.log("Rotten Tomatoes Rating: " + movie.Metascore);
    console.log("Country of Production: " + movie.Country);
    console.log("Movie Language: " + movie.Language);
    console.log("Movie Plot: " + movie.Plot);
    console.log("Actors in the Movie: " + movie.Actors);


    console.log("\n====================================\n")
});
}
