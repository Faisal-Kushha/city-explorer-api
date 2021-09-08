const axios = require("axios");
function getWeather(req, res) {
  let name = req.query.name;
  let URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;
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
  function Forecast(day) {
    (this.date = day.valid_date),
      (this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`);
  }
}

module.exports = getWeather;
