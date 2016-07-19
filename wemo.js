var Wemo         = require('./index');
var WemoClient   = require('./client');
var wemo         = new Wemo();
var obj          = require('./server');

wemo.discover(function(device) {
  if (device.deviceType === Wemo.DEVICE_TYPE.Insight) {
    consle.log(device);
    var client = this.client(device);
  }
  
  client.on('insightParams', function(state, power) {
    console.log('%s’s power consumption: %s W',
      this.device.friendlyName,
      Math.round(power / 1000)
    );
  });

  obj.on('message', function (msg) {
    client.getBinaryState(function (err, data) {
      if (err) return console.log(err);
      if (data !== '0' && msg === 'turn off') {
        client.setBinaryState(0, function(err, res) {
          if (!err) console.log(res);
        });
      } else if (data === '0' && msg === 'turn on') {
          client.setBinaryState(1, function(err, res) {
            if (!err) console.log(res);
          });
        }
    });      
  });
});




