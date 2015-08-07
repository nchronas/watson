var record = require('node-record-lpcm16'),
    fs     = require('fs');
 
var file = fs.createWriteStream('test.wav', { encoding: 'binary' });
 
record.start({
  threshold : 1.9,
  sampleRate : 44100,
  verbose : true
});
 
// Stop recording after three seconds and write to file 
setTimeout(function () {
  record.stop().pipe(file);
}, 3000);