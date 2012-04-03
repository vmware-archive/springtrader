var nano = {
    templates : {},
    utils : {},
    ui : {},
    instances : {},
    containers : {}
};

/**
* Checks on the strings object for the specified key. If the value doesn't exist the key is returned
* @author Carlos Soto <carlos.soto@lognllc.com>
* @param string key for the translation requested
* @return mixed The translated value for that key
*/
nano.utils.translate = function translate(key) {
    var value = key;
    if (typeof strings[key] != 'undefined') {
        value = strings[key];
    }

    // replace the rest of the arguments into the string
    for( var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i + '$s', args[i]);
    }

    return value;
}


nano.utils.getSession = function() {
    return $.cookie( conf.sessionCookieName );
};

nano.utils.login = function(username, password, callbacks) {
    $.cookie( conf.sessionCookieName, 'wewewwe');
};

nano.utils.loggedIn = function() {
    var session = this.getSession();
    return (session != null);
};

// Shorten the name for the templates
var translate = nano.utils.translate