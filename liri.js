var fs = require("fs");
require("dotenv").config();

var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
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
  .then(function(inquirerResponse) {
    switch (inquirerResponse.command) {
      case "concert-this":
        getConcert();
        break;
      case "spotify-this-song":
        getSong();
        break;
      case "movie-this":
        getMovie();
        break;
      case "do-what-it-says":
        doThis();
        break;
      default:
        console.log("please enter something");
        break;
    }
  });

function bands(artist) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist.concert +
        "/events?app_id=" +
        keys.band.id +
        "/date=upcoming"
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

function movieInfo(movieName) {
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        movieName.movie +
        "&y=&plot=short&apikey=" +
        keys.movie.id
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

function getConcert() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What Concert do you want to go to?",
        name: "concert"
      }
    ])
    .then(function(concert) {
      bands(concert);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getMovie() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What movie do you want to see?",
        name: "movie"
      }
    ])
    .then(function(movie) {
      movieInfo(movie);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var newData = data.split(",");
    readRandom(newData[0]);
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
