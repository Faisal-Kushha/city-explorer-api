"use strict";
require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const data = require("./data/weather.json");
const server = express();
server.use(cors());
const PORT = process.env.PORT;
// const PORT = 3456;
const getWeather = require("./weather");
const getMovies = require("./movies");

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

server.get("/weather", getWeather);

server.get("/movies", getMovies);

server.get("*", (req, res) => {
  res.status(500).send("Page Not Found");
});

server.listen(PORT, () => {
  console.log(`I'm listening on ${PORT}`);
});
