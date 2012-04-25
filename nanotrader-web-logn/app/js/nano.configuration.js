/**
 * Default Configuration Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.conf = {
    device : 'computer',                            // Device rendering the application (changes to "mobile" depending on the user agent)
    sessionCookieName : 'nanotraderSession',        // Name of the Cookie that will store the session info in the browser
    urlRoot : '/spring-nanotrader-services/api/',   // Path to the API service
    tplRoot : './templates/',                       // Path to the Templates directory
    accountIdUrlKey : '{accountid}',                // Key in the api urls that's gonna be replaced with the actual accountid
    pageUrlKey : '{page}',                          // Key in the api urls that's gonna be replaced with the actual accountid
    quoteUrlKey : '{quote}',                        // Key in the api urls that's gonna be replaced with the actual accountid
    marketSummaryUpdateMillisecs : 15000,           // Interval of milliseconds in which the Market Summary section updates
    currency : '$',                                 // Current currency is dollars
    itemsPerPage: 5,                                // Amount of items to be displayed on list views
    successCss : 'alert alert-block alert-success', // CSS Class to show success message (or Positive Balance)
    errorCss : 'alert alert-block alert-error'      // CSS Class to show error message (or Negative Balance)
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
    holdings : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/holdings',
    sellHolding : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/order',
    orders : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/orders', 
    order : nano.conf.urlRoot + 'account/' + nano.conf.accountIdUrlKey + '/order', 
    quote : nano.conf.urlRoot + 'quote'
};

nano.conf.tpls = {
    holdings : nano.conf.tplRoot + 'holdings.tpl',
    holdingRow : nano.conf.tplRoot + 'holdingRow.tpl',
    holdingModal : nano.conf.tplRoot + 'holdingModal.tpl',
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
    orders : nano.conf.tplRoot + 'orders.tpl',
    orderRow : nano.conf.tplRoot + 'orderRow.tpl',
    quotes : nano.conf.tplRoot + 'quotes.tpl',
    quoteRow : nano.conf.tplRoot + 'quoteRow.tpl',
    quoteModal : nano.conf.tplRoot + 'quoteModal.tpl',
    warning : nano.conf.tplRoot + 'warning.tpl',
    help : nano.conf.tplRoot + 'help.tpl',
    overview : nano.conf.tplRoot + 'overview.tpl'
};

/**
 * Hash tags to use on the code for the different application routes of the Backbone.Router
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.conf.hash = {
    login  : '#login',
    dashboard : '#dashboard',
    dashboardWithPage : '#dashboard/p{page}',
    portfolio : '#portfolio',
    portfolioWithPage : '#portfolio/p{page}',
    trade : '#trade',
    tradeWithPage : '#trade/p{page}',
    tradeWithQuote : '#trade/q{quote}',
    registration : '#registration',
    profile : '#profile',
    contact : '#contact',
    help : '#help',
    overview : '#overview'
};
