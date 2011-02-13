var x2j = require("xml2js");
var parser = new x2j.Parser();
var request = require('request');
var _ = require('underscore');
var movies = require('./movies');
movies.load();

var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/3dbash');
var Movie = db.model("Movie");

parser.addListener("end", function(feedObj){
  _.each(feedObj.channel.item,function(rss_item){
    var movie = new Movie();
    movie.title = rss_item.title.split("opens")[0];
    movie.up_count = 0;
    movie.down_count = 0;
    movie.save(function(){ console.log("saved: "+movie.title); });
  });
});

request({uri:'http://us.rd.yahoo.com/movies/rss/thisweek/?http://rss.ent.yahoo.com/movies/thisweek.xml'}, 
    function (error, response, body) {
  if (!error && response.statusCode == 200) {
    parser.parseString(body);
  }
});

