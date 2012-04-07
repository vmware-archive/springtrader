/**
 * Nano namespace object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
var nano = {
    utils : {},
    views : {},
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

/**
 * Fetches the session from it's container (cookie)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return Object: Session data
 */
nano.utils.getSession = function() {
    return $.cookie( nano.conf.sessionCookieName );
};

/**
 * Tells whether the session has been created or not.
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return boolean
 */
nano.utils.loggedIn = function() {
    var session = this.getSession();
    nano.session = session;
    return (session != null);
};

/**
 * Logs the user into the system
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @param string username: username to log in
 * @param string password: user's password
 * @param object callbacks: object with success and error callback
 * @return boolean
 */
nano.utils.login = function(username, password, callbacks) {
        $.ajax({
            url : nano.conf.urls.login,
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
                    profileid : data.profileid,
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

/**
 * Logouts the user (deletes the cookie)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return void
 */
nano.utils.logout = function(){
    $.cookie( nano.conf.sessionCookieName, null);
};

/**
 * Builds the HTTP headers array for the api calls. Includes the session token.
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return Object
 */
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

/**
 * Hides all of the different UI components fon the User except from the Footer and the Market Summary
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return Object
 */
nano.utils.hideAll = function() {
    for (var i in nano.containers)
    {
        if (i != 'footer' && i != 'marketSummary')
        {
            nano.containers[i].hide();
        }
    }
};

/**
 * Rounds up a number. Default decimals are two.
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return Object
 */
nano.utils.round = function (number, decimals) {
  if (typeof decimals == 'undefined')
  {
      var decimals = 2;
  }
  var newNumber = Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
  return parseFloat(newNumber);
}

/**
 * Fetches an html template synchronously
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @return Object
 */
nano.utils.getTemplate = function(url){
    var response = $.ajax(url, {
        async : false,
        dataTypeString : 'html'
    });
    return response.responseText;
};

/**
 * Alias for the translation function
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
 var translate = nano.utils.translate