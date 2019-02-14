var fs = require("fs");
require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
// userInput(process.argv[2], process.argv[3]);

function getSong(newChoice) {
  if (newChoice === true) {
    readRandom();
  }
  inquirer
    .prompt([
      {
        type: "input",
        message: "What song do you want to hear?",
        name: "song"
      }
    ])
    .then(function(answer) {
      if (answer.song === "") {
        spotify
          .search({
            type: "artist" && "track",
            query: "Ace of Base",
            limit: 1
          })
          .then(function(response) {
            console.log(response.tracks.items[0].name);
            console.log(response.tracks.items[0].album.artists[0].name);
            console.log(response.tracks.items[0].album.name);
            console.log(
              response.tracks.items[0].album.artists[0].external_urls.spotify
            );
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        spotify
          .search({
            type: "track",
            query: answer.song,
            limit: 1
          })
          .then(function(response) {
            console.log(response.tracks.items[0].name);
            console.log(response.tracks.items[0].album.artists[0].name);
            console.log(response.tracks.items[0].album.name);
            console.log(
              response.tracks.items[0].album.artists[0].external_urls.spotify
            );
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });
}

function getConcert(artist) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What concert do you want to go to?",
        name: "concert"
      }
    ])
    .then(function(uresponse) {
      if (uresponse.concert === "") {
        console.log("Please enter a concert");
      } else {
        axios
          .get(
            "https://rest.bandsintown.com/artists/" +
              artist +
              "/events?app_id=" +
              keys.band.id +
              "/date=upcoming"
          )
          .then(function(response) {
            var concertDate = moment(response.data[0].datetime).format(
              "dddd, MMMM Do YYYY"
            );
            console.log(concertDate);
            console.log(response.data[0].venue.name);
            console.log(
              response.data[0].venue.city +
                ", " +
                response.data[0].venue.region +
                " " +
                response.data[0].venue.country
            );
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
}
function getMovie() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What movie do you want to look up?",
        name: "movie"
      }
    ])
    .then(function(userResponse) {
      var movieName = userResponse.movie;
      if (userResponse.movie === "") {
        console.log(userResponse.movie);

        console.log("Please enter the name of a movie.");
      } else {
        console.log(userResponse.movie);

        axios
          .get(
            "http://www.omdbapi.com/?t=" +
              movieName +
              "&y=&plot=short&apikey=" +
              keys.movie.id
          )
          .then(function(response) {
            console.log(response.data);
            console.log(response.data.Title);
            var releaseDate = moment(
              response.data.Released,
              "Do MMMM YYYY"
            ).format("MMMM Do, YYYY");
            console.log("Release Date: " + releaseDate);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log(
              response.data.Ratings[1].Source +
                " Rating: " +
                response.data.Ratings[1].Value
            );
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
          });
      }
    });
}
function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var newData = data.split(",");
    readRandom(newData[0], newData[1]);
  });
}

function readRandom(newData, newChoice) {
  if (newData === "concert-this") {
    getConcert(newChoice);
  }
  if (newData === "spotify-this-song") {
    getSong(newChoice);
  }
  if (newData === "movie-this") {
    getMovie(newChoice);
  }
  if (newData === "do-what-it-says") {
    doThis(newChoice);
  }
}

inquirer
  .prompt([
    {
      type: "list",
      choices: [
        "spotify-this-song",
        "concert-this",
        "movie-this",
        "do-what-it-says"
      ],
      name: "command"
    }
  ])
  .then(function(response) {
    if (response.command === "concert-this") {
      getConcert();
    }
    if (response.command === "spotify-this-song") {
      getSong();
    }
    if (response.command === "movie-this") {
      getMovie();
    }
    if (response.command === "do-what-it-says") {
      doThis();
    }
  });
