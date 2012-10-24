nano.conf.device = 'mobile';
nano.conf.pageSize = 2;
nano.conf.pageSize.pageCountSize = 6; // Amount of pages to be displayed on the pagination
// Replace the templates with their mobile versions (if needed)
_.extend(nano.conf.tpls, {
    holdings : nano.conf.tplRoot + 'holdings.mobile.tpl',
    holdingRow : nano.conf.tplRoot + 'holdingRow.mobile.tpl',
    marketSummary : nano.conf.tplRoot + 'marketSummary.mobile.tpl',
    portfolioSummary : nano.conf.tplRoot + 'portfolioSummary.mobile.tpl',
    accountSummary : nano.conf.tplRoot + 'accountSummary.mobile.tpl',
    login : nano.conf.tplRoot + 'login.mobile.tpl',
    portfolio : nano.conf.tplRoot + 'portfolio.mobile.tpl',
    positions : nano.conf.tplRoot + 'positions.mobile.tpl',
    userStatistics : nano.conf.tplRoot + 'userStatistics.mobile.tpl',
    registration : nano.conf.tplRoot + 'registration.mobile.tpl',
    profile : nano.conf.tplRoot + 'profile.mobile.tpl',
    orders : nano.conf.tplRoot + 'orders.mobile.tpl',
    quotes : nano.conf.tplRoot + 'quotes.mobile.tpl',
    orderRow : nano.conf.tplRoot + 'orderRow.mobile.tpl'
});
