require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");

var userChoice = process.argv[2];

switch (userChoice) {
  case "concert-this":
    console.log("the concert is: ");

    break;
  case "spotify-this-song":
    getSong();
    break;
  case "movie-this":
    console.log("this movie is: ");

    break;
  case "do-what-it-says":
    console.log("whatever");

    break;

  default:
    console.log("please enter something");

    break;
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
