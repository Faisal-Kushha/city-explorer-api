const axios = require("axios");
const Forecast = require("./Forecast");

function getWeather(req, res) {
  let name = req.query.name;
  let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=${process.env.WEATHER_API_KEY}`;
  axios
    .get(URL)
    .then((arr) => {
      let newDay = arr.data.data.map((item) => {
        return new Forecast(item);
      });
      res.send(newDay);
      console.log(newDay);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = getWeather;
