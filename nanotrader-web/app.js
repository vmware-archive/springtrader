Ext.application({
    name : 'NanoTrader',
    appFolder : 'app',
    autoCreateViewPort : true,
    controllers : ['AccountSummaryController', 'PortfolioController',
				'TradeController', 'UserController'],
    launch : function() {
    }
});