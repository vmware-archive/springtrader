/**
 * Default Configuration Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @author Kashyap Parikh
 */
nano.conf = {
    sessionCookieName : 'nanotraderSession',       // Name of the Cookie that will store the session info in the browser
    urlRoot : '/spring-nanotrader-services/api/',  // Path to the API service
    tplRoot : './templates/',                      // Path to the Templates directory
    accountIdUrlKey : '{accountid}',               // Key in the api urls that's gonna be replaced with the actual accountid
    marketSummaryUpdateMillisecs : 15000,          // Interval of milliseconds in which the Market Summary section updates
    currency : '$'                                 // Current currency is dollars
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
    portfolioSummary : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/portfolioSummary',
    holdings : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/holding',
    orders : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/order',
    admin : nano.conf.urlRoot + 'recreateData'
};

nano.conf.tpls = {
    marketSummary : nano.conf.tplRoot + 'marketSummary.tpl',
    portfolioSummary : nano.conf.tplRoot + 'portfolioSummary.tpl',
    navbar : nano.conf.tplRoot + 'navbar.tpl',
    accountSummary : nano.conf.tplRoot + 'accountSummary.tpl',
    footer : nano.conf.tplRoot + 'footer.tpl',
    login : nano.conf.tplRoot + 'login.tpl',
    portfolio : nano.conf.tplRoot + 'portfolio.tpl',
    positions : nano.conf.tplRoot + 'positions.tpl',
    userStatistics : nano.conf.tplRoot + 'userStatistics.tpl',
    registration : nano.conf.tplRoot + 'registration.tpl',
    profile : nano.conf.tplRoot + 'profile.tpl',
    trade : nano.conf.tplRoot + 'trade.tpl',
    contact : nano.conf.tplRoot + 'contact.tpl',
    admin : nano.conf.tplRoot + 'admin.tpl'
};

/**
 * Hash tags to use on the code for the different application routes of the Backbone.Router
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.conf.hash = {
    login  : '#login',
    dashboard : '#dashboard',
    portfolio : '#portfolio',
    trade : '#trade',
    registration : '#registration',
    profile : '#profile',
    contact : '#contact',
    admin : '#admin'
};
