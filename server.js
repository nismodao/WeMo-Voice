require('dotenv').config();
var express      = require ( 'express' );
var app          = express();
var bodyParser   = require ( 'body-parser');
var AWS          = require('aws-sdk');
var publish      = require('./publish');

app.use( express.static(__dirname + '/public'));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({
  extended: true
})); 

AWS.config.update({
  region: 'us-west-1'
});

var sqs = new AWS.SQS();

app.post('/', publish.send);

app.listen(3000);