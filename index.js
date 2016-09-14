//GLOBAL VARIABLE - Leaderboard
var leaderboard = [
  {name:"Luke",initials:"SKY",score:1234},
  {name:"Yi Hui",initials:"LYH",score:989}
];

//Required library initialization
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors'); //Allow cross server requests
var app = express();

// configure app to use ejs for templates
// app.set('view engine', 'ejs');

// tell our server where our static files live.
var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));
app.use(cors());

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));



app.get('/entries', function(req, res) {
  res.json(leaderboard);
});

app.get('/entries/:id', function(req, res) {

});

app.post('/entries', function(req, res) {
  var entry = {
    name: req.body.name,
    initials: req.body.initials,
    score: req.body.score
  };
  leaderboard.push(entry);
  res.json(leaderboard);
});

app.put('/entries/:id', function(req, res) {
  var entry = {
    name: req.body.name,
    initials: req.body.initials,
    score: req.body.score
  };
  leaderboard.splice(req.params.id,1,entry);
  res.json(leaderboard);
});

app.delete('/entries/:id', function(req, res) {
  leaderboard.splice(req.params.id,1);
  res.json(leaderboard);
});

app.listen(3000);
