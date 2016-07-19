var express      = require ( 'express' );
var app          = express();
var bodyParser   = require ('body-parser');
var EventEmitter = require('events').EventEmitter;
var util         = require('util');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

var Message = function () {
  this.store = {};
}

util.inherits(Message, EventEmitter);

Message.prototype.send = function (value) {
  this.emit('message', value);
}

var obj = new Message();

app.post('/', function (req, res) {
  var message = req.body.message.match(/turn on|turn off/i);
  (!!message) ? message = message[0].trim() : message = 'not a valid input';
  obj.send(message);
  res.end();
});

module.exports = obj;
app.listen(3000);