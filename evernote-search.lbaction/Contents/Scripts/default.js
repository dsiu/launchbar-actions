// The 'run' function is called by LaunchBar when the user opens the action.
//include('book.js');

// var en = require('./en.js');

//function run() {
//  LaunchBar.debugLog('run');
//}
//
//function runWithString(string) {
//    var output = LaunchBar.execute('/opt/local/bin/bash','run.sh', 'evernote.js');
//
//    LaunchBar.debugLog(output);
//    return [{title: output}];
//}



// The 'run' function is called by LaunchBar when the user opens the action.
//include('book.js');

console.log(this);

var Evernote = Library('evernote');

this.run = function run() {
  // LaunchBar.debugLog('run');
  return 'i am run handler';
}

this.handle_string = function handle_string(_string) {
//    var output = LaunchBar.execute('/opt/local/bin/bash','run.sh', 'evernote.js');

//    LaunchBar.debugLog(output);
//    return [{title: output}];
return [{title: 'i am handle string handler - arg = ' + _string,
	     subtitle: 'sub', url:  'http://douban.com',
		 icon : "at.obdev.LaunchBar",
		 }];

};
