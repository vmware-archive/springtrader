// namespace container
var nano = {
    templates : {},
    utils : {},
    ui : {},
    instances : {},
    containers : {},
    models : {},
    strings : {},
    conf : {},
    session : {}
};

/**
* Checks on the strings object for the specified key. If the value doesn't exist the key is returned
* @author Carlos Soto <carlos.soto@lognllc.com>
* @param string key for the translation requested
* @return mixed The translated value for that key
*/
nano.utils.translate = function translate(key) {
    var value = key;
    if (typeof nano.strings[key] != 'undefined') {
        value = nano.strings[key];
    }

    // replace the rest of the arguments into the string
    for( var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i + '$s', args[i]);
    }

    return value;
}


nano.utils.getSession = function() {
    return $.cookie( nano.conf.sessionCookieName );
};

nano.utils.loggedIn = function() {
    var session = this.getSession();
    nano.session = session;
    return (session != null);
};

nano.utils.login = function(username, password, callbacks) {
        $.ajax({
            url : nano.conf.urlRoot + 'login',
            type : 'POST',
            headers : nano.utils.getHttpHeaders(),
            dataType : 'json',
            data : JSON.stringify({
                username : username,
                password : password
            }),
            success : function(data, textStatus, jqXHR){

                //Store the session info in the cookie.
                var info = {
                    username : username,
                    accountid : data.accountid,
                    authToken : data.authToken
                };
                nano.session = info;
                $.cookie( nano.conf.sessionCookieName, info);
                if (_.isFunction(callbacks.success))
                {
                    callbacks.success(info);
                }
            },
            error : function(jqXHR, textStatus, errorThrown){
                if (_.isFunction(callbacks.error))
                {
                    callbacks.error(jqXHR, textStatus, errorThrown);
                }
            }
        });
};

nano.utils.logout = function(){
    $.cookie( nano.conf.sessionCookieName, null);
};

nano.utils.getHttpHeaders = function(){
    var headers = {
        "Content-Type" : "application/json"
    };
    // Add the authentication token to if if logged in
    if ( nano.utils.loggedIn() )
    {
        headers.API_TOKEN = nano.session.authToken;
    }
    return headers;
};

nano.utils.hideAll = function() {
    for (var i in nano.containers)
    {
        if (i != 'footer' && i != 'marketSummary')
        {
            nano.containers[i].hide();
        }
    }
};

nano.utils.round = function (number, decimals) {
  if (typeof decimals == 'undefined')
  {
      var decimals = 2;
  }
  var newNumber = Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
  return parseFloat(newNumber);
}

// Shorten the name for the templates
var translate = nano.utils.translate