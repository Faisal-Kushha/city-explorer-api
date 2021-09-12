function Load(day) {
  (this.title = day.original_title),
    (this.overview = day.overview),
    (this.average_votes = day.vote_average),
    (this.total_votes = day.vote_count),
    (this.popularity = day.popularity),
    (this.released_on = day.release_date);
  this.image_url = day.poster_path;
}
module.exports = Load;
