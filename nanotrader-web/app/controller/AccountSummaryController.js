Ext.define('NanoTrader.controller.AccountSummaryController', {
			extend : 'Ext.app.Controller',
			models : ['AccountSummary', 'UserStatistics'],
			stores : ['Portfolio']
		})