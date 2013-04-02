var page = require("webpage").create();
var system = require('system');
var url;

if (system.args.length != 2) {
	console.log('Usage: jasmine-runner.js <URL>');
	phantom.exit(127);
}

// Handle window.console.log(msg);
page.onConsoleMessage = function() {
    console.log(arguments[0]);
    if (arguments[0] == "ConsoleReporter finished: fail") {
      setTimeout(function() { phantom.exit(1); }, 100);
    }
    if (arguments[0] == "ConsoleReporter finished: success") {
      setTimeout(function() { phantom.exit(0); }, 100);
    }
};

console.log("Opening: " + system.args[1]);
page.open(system.args[1]);
