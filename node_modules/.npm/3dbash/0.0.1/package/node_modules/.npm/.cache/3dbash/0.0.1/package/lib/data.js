var _ = require("underscore");
exports.data = {
  movies:[],
  users:[],
  getMovie: function(id){
    return _.detect(this.movies, function(movie){ return movie.id == id });
  }
}


