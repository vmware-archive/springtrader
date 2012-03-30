steal(
    '../../jquery/dom/cookie/cookie.js',
    function() {

    nanotrader.utils.getSession = function() {
        return $.cookie('nanotraderSession');
    };
    nanotrader.utils.login = function(username, password, callbacks) {
        $.cookie('nanotraderSession', 'wewewwe');
    };
    nanotrader.utils.loggedIn = function() {
        var session = this.getSession();
        return (session != null);
    };
});