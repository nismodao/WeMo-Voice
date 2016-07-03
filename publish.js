require('dotenv').config();
var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-1'
});
var sqs = new AWS.SQS();

module.exports = {
  send: (req, res) => {
    var message = req.body.message.match(/turn on|turn off/i);
    (!!message) ? message = message[0].trim() : message = 'not a valid input';
    var params = {
      MessageBody: message + '',
      QueueUrl: '',
      DelaySeconds: 0,
      QueueUrl: process.env.queue_URL
    };
    sqs.sendMessage(params, function(err, data) {
      (err) ? console.log(err, err.stack) : console.log(data);        
    });
    res.end();
  }
}
