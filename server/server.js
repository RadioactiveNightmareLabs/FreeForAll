var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var cron = require('cron');
var bodyParser = require ('body-parser');
app.set('port', (process.env.PORT || 1337));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/',router);

// ROUTES
router.get('/', function(req,res) {
  res.end('Hello World!');
})

router.get('/foo', function(req,res) {
  res.end('Noice!');
})

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
}); test