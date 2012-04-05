/**
 * Default Configuration Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.conf = {
    sessionCookieName : 'nanotraderSession',    // Name of the Cookie that will store the session info in the browser
    urlRoot : '/spring-nanotrader-services/api/', // Path to the API service
    accountIdUrlKey : '{accountid}'               // Key in the api urls that's gonna be replaced with the actual accountid
};
/**
 * API urls
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.conf.urls = {
    login : nano.conf.urlRoot + 'login',
    account : nano.conf.urlRoot + 'account',
    accountProfile : nano.conf.urlRoot + 'accountProfile',
    marketSummary : nano.conf.urlRoot + 'marketSummary',
    holdingSummary : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/holdingSummary',
    holdings : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/holding',
};