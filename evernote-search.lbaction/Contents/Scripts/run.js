/**
 * Created with IntelliJ IDEA.
 * User: Danny Siu <danny.siu@gmail.com>
 * Date: 5/14/15
 * Time: 14:33
 */
var exec = require('child_process').exec, child;


function run1() {
  child = exec('(echo \'window = this;\'; ./node_modules/.bin/browserify evernote.js; echo \';ObjC.import("stdlib");$.exit(0)\') | /usr/bin/osascript -l JavaScript',
    function ( err, stdout, stderr ) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if ( err !== null ) {
        console.log('exec error: ' + error);
      }
    });
}

function run2() {
  child = exec('/opt/local/bin/bash -e run.sh evernote.js',
    function ( err, stdout, stderr ) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if ( err !== null ) {
        console.log('exec error: ' + error);
      }
    });
}

run2();
