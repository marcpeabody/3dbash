
/**
 * Module dependencies.
 */

var express = require('express'),
    Movies = require("./lib/movies");

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
//

var data = [];
for(var i=0;i<10;i++){
  var m = new Movies.movie();
  m.title = "Tron Part:"+i.toString();
  m.votes.up = i;
  data.push(m);
}

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
    m.title = req.body.title
    data.push(m);
    res.send({status: 201, data:m});
  }
});

app.post("/up", function(req, res){
  if (req.body.title) {
    var m = //lookup movie
    m.up++;
    res.render('index', {
      locals: {
        title: 'Welcome to 3D Bash',
        data: data
      }
    });
  }
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
