const axios = require("axios");

function getMovies(req, res) {
  let name = req.query.name;
  let URL = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`;
  axios
    .get(URL)
    .then((arr) => {
      let newMovie = arr.data.results.map((item) => {
        return new Load(item);
      });
      res.send(newMovie);
    })
    .catch((err) => {
      console.log(err);
    });
  function Load(day) {
    (this.title = day.original_title),
      (this.overview = day.overview),
      (this.average_votes = day.vote_average),
      (this.total_votes = day.vote_count),
      (this.popularity = day.popularity),
      (this.released_on = day.release_date);
  }
}
module.exports = getMovies;
