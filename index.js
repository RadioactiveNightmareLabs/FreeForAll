var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require ('body-parser');

var cron = require('cron').CronJob;
var time = require('time');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('port', (process.env.PORT || 5000));

app.use('/',express.static(__dirname + '/client'));

// Routes
app.use('/',router);

router.get('/', function(request, response) {
  response.sendFile('/index.html');
});

router.get('/foo', function(request, response) {
  response.send('foo!');
});

// Cron
var job = function (time, cb) {
  var job = new cron({
    cronTime: time,
    onTick: cb(),
    start: false,
    timeZone: "America/Lost_Angeles"
  });
  return job.start();
};

// schedule every minute
job('* * * * * *', function(){
  console.log('hey');
});










app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
