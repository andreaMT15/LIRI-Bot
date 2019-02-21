# LIRI-Bot

**Developer: Andrea Minhas**

**Technologies Used:**
**- Javascript**
**-JQuery**
**-Node.Js**
**-Inquirer NPM Package**
**-Moment.Js**

Liri is a command line application that uses the inquier NPM package to take in user commands and queries from the command line and return data from API's. The following commands have been hard coded into the program to give the user the capability to look up songs, concerts and movie information:

-concert-this	uses the bandsintown API to take a band name from the user and returns that bands next concert along with the venue information
-spotify-this	uses the spotify API to take a song name from the user and returns the artist, song name, spotify-link and album
-movie-this	uses the OMDB API to take a movie name and returns the name, release year, IMDB and Rotten Tomatoes rating, country of origin, language and plot
-do-what-it-says uses the built in readFile() method to access data from a prepopulated .txt file and return its information as a command/search query.

Since this is a command line application you will have to clone it down and install the necessary dependecies in order for the application to run. 

![liridemo](https://user-images.githubusercontent.com/44379703/53207645-e1a00400-35f9-11e9-8b48-a762895a13d7.gif)

