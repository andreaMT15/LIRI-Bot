console.log("this is loaded");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.band = {
  id: process.env.BandsInTown_ID
};

exports.movie = {
  id: process.env.OMDB_ID
};
