desc("deploys files to nginx");
task('deploy',[], function(){
  var util   = require('util'),
      exec  = require('child_process').exec,
      child;

  child = exec('scp -r ./ root@184.73.180.169:/home/www/apps/3dbash',
  function (error, stdout, stderr) {
      console.log("uploading files to amazon");
      console.log('stdout: ' + stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      console.log("done.");
  });
});
