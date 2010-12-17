var twitterConsumerKey = "";
var twitterConsumerSecret = "";

/**
 * Module dependencies.
 */
 var _ = require("underscore"),
    express = require('express'),
    movies = require("./lib/movies"),
    auth = require("connect-auth"),
    mongoose = require('mongoose').Mongoose,
    db = mongoose.connect('mongodb://localhost/3dbash');

var app = module.exports = express.createServer();
//bootstrap models;
_.each([movies], function(model){ model.load(); });
var Movie = db.model('Movie');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.staticProvider(__dirname + '/public'));
  app.use(app.router);
  app.use(auth( [
    auth.Twitter({consumerKey: twitterConsumerKey, consumerSecret: twitterConsumerSecret})
  ]));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res){
  Movie.find().all(function(movies){
    res.render('index', {
      locals: {
        title: 'Welcome to 3D Bash',
        movies: movies
      }
    });
  });
});

app.post("/up", function(req, res){
  if (req.body.id) {
    Movie.find({id:req.body.id}).first(function(movie){
      movie.up_count++;
      movie.save();
      res.send({status: 200, movie:movie});
    });
  }
});

app.post("/down", function(req, res){
  if (req.body.id) {
    Movie.find({id:req.body.id}).first(function(movie){
      movie.down_count++;
      movie.save();
      res.send({status: 200, movie:movie});
    });
  }
});


// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000, "localhost", function(){
    console.log("Node is doing its thang.");
  });
}
