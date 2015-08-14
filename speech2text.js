'use strict';

var username = process.env.USERNAME;
var password = process.env.PASSWORD;
var resin_token = process.env.authToken;
var watson = require('watson-developer-cloud');
var fs = require('fs');
var resin = require('resin-sdk');

var speech_to_text = watson.speech_to_text({
  username: username,
  password: password,
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

var params = {
  audio: fs.createReadStream('./speech.wav'),
  content_type: 'audio/wav; rate=44100'
};

speech_to_text.recognize(params, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(res, null, 2));
    if (res.results[0].alternatives[0].transcript.match(/devices/i)) {
      resin.auth.loginWithToken(resin_token).then(function() {
        resin.models.device.getAllByApplication('Watson').then(function(devices) {
          return console.log(devices);
        });
      });
    }
  }
});
