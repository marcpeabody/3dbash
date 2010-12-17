var twitterConsumerKey = "";
var twitterConsumerSecret = "";

/**
 * Module dependencies.
 */
 var _ = require("underscore"),
    express = require('express'),
    Movies = require("./lib/movies"),
    auth = require("connect-auth"),
    data = require("./lib/data").data;

var app = module.exports = express.createServer();

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
  res.render('index', {
    locals: {
      title: 'Welcome to 3D Bash',
      data: data
    }
  });
});

app.post("/movies", function(req, res){
  if (req.body.title) {
    var m = new Movies.movie();
    m.id = parseInt(Date.now());
    m.title = req.body.title;
    data.movies.push(m);
    res.send({status: 201, data:m});
  }
});

app.post("/up", function(req, res){
  if (req.body.id) {
    var m = data.getMovie(req.body.id);
    m.votes.up++;
    res.send({status: 200, movie:m});
  }
});

app.post("/down", function(req, res){
  if (req.body.id) {
    var m = data.getMovie(req.body.id);
    m.votes.down++;
    res.send({status: 200, movie:m});
  }
});

if(app.settings.env === 'development'){
  // seed some dev data
  function newRandomMovie(){
    var m = new Movies.movie();
    m.id = parseInt(Date.now());
    m.title = "Tron v.1."+m.id;
    data.movies.push(m);
    if(data.movies.length < 10){
      setTimeout(newRandomMovie, 1000);
    }
  }
  setTimeout(newRandomMovie, 1000);
}
// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
