var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');
// var config = require('./config.json');

// ++++++++++++++++++++++++++++++++++++++
//configure middleware
// ++++++++++++++++++++++++++++++++++++++

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('public'));
app.set('port', 8080);

// ++++++++++++++++++++++++++++++++++++++
// endpoints
// ++++++++++++++++++++++++++++++++++++++


app.get('/', function(req,res){
  res.render('index');
})


app.get('*', function(req, res) {
  res.render('index');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
