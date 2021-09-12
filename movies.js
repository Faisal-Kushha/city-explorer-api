const axios = require("axios");

const Load = require("./Load");

let movieMemory = {};

function getMovies(req, res) {
  let name = req.query.name;

  if (movieMemory[name] !== undefined) {
    res.send(movieMemory[name]);
  } else {
    let URL = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`;
    axios
      .get(URL)
      .then((arr) => {
        let newMovie = arr.data.results.map((item) => {
          return new Load(item);
        });
        movieMemory[name] = newMovie;
        res.send(newMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = getMovies;
