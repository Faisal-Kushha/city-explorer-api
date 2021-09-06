"use strict";
require("dotenv").config();
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
server.get("/weather", (req, res) => {
  let name = req.query.name;
  let weather = data.find((item) => {
    if (name === item.city_name) {
      return item.city_name;
    }
  });
  let arr = [
    {
      city: weather.city_name,
      lat: weather.lat,
      lon: weather.lon,
      day1: {
        weather: weather.data[0].weather.description,
        time: weather.data[0].datetime,
      },
      day2: {
        weather: weather.data[1].weather.description,
        time: weather.data[1].datetime,
      },
      day3: {
        weather: weather.data[2].weather.description,
        time: weather.data[2].datetime,
      },
    },
  ];
  res.send(arr);
});

server.get("*", (req, res) => {
  res.status(500).send("Page Not Found");
});

server.listen(PORT, () => {
  console.log(`I'm listening on ${PORT}`);
});
