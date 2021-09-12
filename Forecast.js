function Forecast(day) {
  (this.date = day.valid_date),
    (this.desc = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`);
}

module.exports = Forecast;
