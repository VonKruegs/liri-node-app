# LIRI Bot

## Purpose!

Create LIRI which is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back formatted data.

## Packages Required!

### NPM Packages

node-spotify-api
moment
axios
fs
dotenv

### Created

keys.js
.env

The keys.js file exports the various api keys to the liri script from the .env file in order to add some security aroudn the keys.

# What Liri Does!

## Upfront Command Differentiation!

Liri takes in a command and a searchTerm and executes various functions. Most require user input via the command prompt line, however Liri can also read files instead of user input. The command "do-what-it-says" reads a file, while the rest of them require user input from the command line. So these commands are differentiated up front from the readFile to keep things simple in the code:

if (command === "do-what-it-says"){
  // grab the actual command
  fs.readFile("random.txt", "utf-8", function(error,data){
    var dataArr = data.split(",");
    runCommand(dataArr[0],dataArr[1]);

  }
  )
}
###// The rest require user input from the command line in position 2 which is the actual command and position 3 which is the searchTerm i.e. a song, band name, movie title etc. These are exectued by a basic runCommand function that takes the command and searchTerm and runs it to further simplify the code upfront:

else{
  var searchTerm = process.argv.slice(3).join(" ")
  runCommand(command, searchTerm)

}

function runCommand(command, searchTerm){
  if (command === "concert-this"){
    concertThis(searchTerm)
  }
  
  else if(command === "spotify-this-song"){
    
    if (searchTerm.length === 0) {
      searchTerm = "The Sign";
    }
    spotifyThis(searchTerm)
    
  }
  
  else if (command === "movie-this"){

    if (searchTerm.length === 0){
      searchTerm = "Mr. Nobody";
    }

    movieThis(searchTerm)
    console.log(searchTerm);

  }
  

}

## The Individual Command Functions and examples!

### do-what-it-says reads a file and does whats in the file!

if (command === "do-what-it-says"){
  // grab the actual command
  fs.readFile("random.txt", "utf-8", function(error,data){
    var dataArr = data.split(",");
    runCommand(dataArr[0],dataArr[1]);

  }
  )

#### see image file dowhatitsays.png

### concert-this is entered in the command line with a band name following it. It returns info. for the next concert. If no info. it will say that the band is not coming anytime soon:

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
      //console.log(result);

      console.log("Venue name: " + result.venue.name);
      console.log("Venue location: " + result.venue.city);
      console.log("Date of Event: " +  moment(result.datetime).format("MM/DD/YYYY"));

     };

    });

  };

  #### See image files concertthis.png and concerthisnoinfo.png

  ### spotify-this-song is entered in the command line with a song name and the song information - all songs with that title and each including a link to play an audible sample file - is returned! If the person does not enter a song name and executes the command it will always return information for a Karaoke versions of The Sign by Ace of Base:

function spotifyThis(song) {

  //console.log(keys.spotify)
  var spotify = new Spotify(keys.spotify);

   
  spotify.search({ type: 'track', query: song})
    .then(function(response) {
      
      for(var i=0; i < response.tracks.items.length; i++) {
        var songs = response.tracks.items[i]
      console.log(songs.artists[0].name);
      console.log(songs.preview_url)
      console.log(songs.name)
      console.log(songs.album.name)

      console.log("\n====================================\n")

      }

    })
    .catch(function(err) {
      console.log(err);
    });
};

#### see images spotifythissong.png and spotifythissongnosong.png

### movie-this is entered in the command line with a movie title and movie information is returned for the film including ratings, year it was made, country of production and more! If a movie title is not entered by the user it returns the information for a film named Mr. Nobody:

function movieThis(title){


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

#### see images moviethis.png and moviethisnotitle.png



