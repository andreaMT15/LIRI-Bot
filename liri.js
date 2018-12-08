var fs = require("fs");
require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
userInput(process.argv[2], process.argv[3]);

function userInput(command, choice) {
  switch (command) {
    case "concert-this":
      console.log(choice);
      var artistChoice = choice;
      getConcert(artistChoice);
      break;
    case "spotify-this-song":
      getSong();
      break;
    case "movie-this":
      var movieChoice = choice;
      getMovie(movieChoice);
      break;
    case "do-what-it-says":
      doThis();
      break;
    default:
      console.log("please enter something");
      break;
  }
}

function getSong() {
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
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=2b1f624811f2f643ca41a2ea162042f2/date=upcoming"
    )
    .then(function(response) {
      console.log(response.data[0].venue.name);
      console.log(
        response.data[0].venue.city +
          ", " +
          response.data[0].venue.region +
          " " +
          response.data[0].venue.country
      );
      var concertDate = moment(response.data[0].datetime).format(
        "dddd, MMMM Do YYYY"
      );
      console.log(concertDate);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getMovie(movieName) {
  axios
    .get(
      "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log(response.data.Title);
      var releaseDate = moment(response.data.Released, "Do MMMM YYYY").format(
        "MMMM Do, YYYY"
      );
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

function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var newData = data.split(",");
    userInput(newData[0], newData[1]);
  });
}
