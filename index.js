// //GLOBAL VARIABLE - Leaderboard
// var leaderboard = [
//   {name:"Luke",initials:"SKY",score:1234},
//   {name:"Yi Hui",initials:"LYH",score:989}
// ];

//Required library initialization
var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors'); //Allow cross server requests
var app = express();
var db = require("./models");

// configure app to use ejs for templates
// app.set('view engine', 'ejs');

// tell our server where our static files live.
// var staticPath = path.join(__dirname, 'html');
app.use(express.static("html"));
app.use(cors());

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.get('/entries', returnUpdatedLeaderboard);

app.get('/entries/:id', function(req, res) {

});

app.post('/entries', function(req, res) {
  db.highscores.create(req.body.entry).then(function(data) {
    returnUpdatedLeaderboard(req, res);
  });
});

app.put('/entries/:id', function(req, res) {
  db.highscores.update(req.body.entry,{
    where: {id:req.params.id}
  }).then(function(highscore) {
    returnUpdatedLeaderboard(req, res);
  });
});

app.delete('/entries/:id', function(req, res) {
  db.highscores.destroy({
    where: {id:req.params.id}
  }).then(function(data) {
    returnUpdatedLeaderboard(req, res);
  });
});

app.listen(3000);

function returnUpdatedLeaderboard(req, res) {
  db.highscores.findAll().then(function(highscores) {
    res.json(highscores);
  });
}
