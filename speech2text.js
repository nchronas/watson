'use strict';
sys = require('sys');

var username = process.env.USERNAME;
var password = process.env.PASSWORD;

var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: username,
  password: password,
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

var params = {
  // From file
  audio: fs.createReadStream('./speech.wav'),
  content_type: 'audio/wav; rate=44100'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
