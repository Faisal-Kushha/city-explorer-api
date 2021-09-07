"use strict";
require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const data = require("./data/weather.json");
const server = express();
server.use(cors());
const PORT = process.env.PORT;
// const PORT = 3456;

//http://localhost:3456/
server.get("/", (req, res) => {
  res.send("Home Route");
});

//http://localhost:3456/weather
// server.get("/weather", (req, res) => {
//   let name = req.query.name;
//   let weatherArr = [];
//   let weather = data.find((item) => {
//     if (name === item.city_name) {
//       weatherArr = item.data.map((day) => {
//         let newObj = new Forecast(day);
//         return newObj;
//       });
//     }
//   });

//   res.send(weatherArr);
// });

// function Forecast(day) {
//   (this.date = day.valid_date),
//     (this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`);
// }

server.get("/weather", (req, res) => {
  let name = req.query.name;
  // let lat = req.query.lat;
  // let lon = req.query.lon;
  let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;
  let getWeather = async () => {
    try {
      let arr = await axios.get(URL);
      let newDay = arr.data.data.map((item) => {
        return new Forecast(item);
      });
      res.send(newDay);
      console.log(newDay);
    } catch {
      (err) => console.log(err);
    }
  };
  getWeather();
  function Forecast(day) {
    (this.date = day.valid_date),
      (this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`);
  }
});

server.get("/movies", (req, res) => {
  let name = req.query.name;

  let URL = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`;
  let getMovies = async () => {
    try {
      let arr = await axios.get(URL);
      let newMovie = arr.data.results.map((item) => {
        return new Load(item);
      });
      res.send(newMovie);
    } catch {
      (err) => console.log(err);
    }
  };
  getMovies();
  function Load(day) {
    (this.title = day.original_title),
      (this.overview = day.overview),
      (this.average_votes = day.vote_average),
      (this.total_votes = day.vote_count),
      (this.popularity = day.popularity),
      (this.released_on = day.release_date);
  }
});

server.get("*", (req, res) => {
  res.status(500).send("Page Not Found");
});

server.listen(PORT, () => {
  console.log(`I'm listening on ${PORT}`);
});
