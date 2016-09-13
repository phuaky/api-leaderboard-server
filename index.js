//GLOBAL VARIABLE - Leaderboard
var leaderboard = [
  {name:"Luke",score:1234},
  {name:"Yi Hui",score:989}
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
  leaderboard.push(req.body);
  res.send(leaderboard);
});


app.put('/entries/:id', function(req, res) {
  leaderboard.splice(req.params.id,1,req.body.entry);
  res.send(true);
});


app.delete('/entries/:id', function(req, res) {
  leaderboard.splice(req.params.id,1);
  res.send(true);
});

app.get('/todos', function(req, res) {
  res.send(todoList);
});

app.listen(3000);
