var page = require("webpage").create();

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

page.open('http://localhost:8080/spring-nanotrader-sencha/jasmine/SpecRunnerPhantomJS.html');
