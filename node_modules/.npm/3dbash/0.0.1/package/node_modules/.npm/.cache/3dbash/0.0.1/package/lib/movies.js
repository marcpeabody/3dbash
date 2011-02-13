var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/3dbash');

exports.load = function(){
  var Movie = new mongoose.Schema({
      title             : { type: String, index: true }
    , up_count          : Number
    , down_count        : Number
    , isActiveForVoting : { type: Number, default: 0 }
  });
  mongoose.model('Movie', Movie);
};
