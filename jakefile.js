desc("deploys files to nginx");
task('deploy',[], function(){
  var util   = require('util'),
      exec  = require('child_process').exec,
      child;

  console.log("uploading files to amazon");
  child = exec('scp -r ./ root@3dbash.com:/home/www/apps/3dbash',
  function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      console.log("files upload task complete.");
  });
});

desc("reboot server");
task("reboot", [], function(){
  var util = require('util'),
      exec = require('child_process').exec,
      child;

  console.log("ssh to bounce it all.");
  child = exec("ssh root@3dbash.com '/home/www/apps/3dbash/boot'",
  function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      console.log("reboot task complete.");
  });
});

desc("send and restart");
task("send", ['deploy', 'reboot'], function(){console.log("send and reboot complete.");});
