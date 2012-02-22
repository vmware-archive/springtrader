Ext.application({
	name : 'NanoTrader',
	appFolder : 'app',
	autoCreateViewPort : false,
	models : ['NanoTrader.model.AccountSummary'],
	stores : ['NanoTrader.store.QuoteListStore'],
	launch : function() {
		Ext.create('Ext.container.Viewport', {
					layout : 'border',
					model : Ext.ModelManager
							.getModel('NanoTrader.model.AccountSummary'),
					items : [{
						region : 'center',
						xtype : 'tabpanel',
						layout : 'fit',
						activeTab : 0,
						items : [{
							title : 'Home',
							layout : 'fit',
							xtype : 'gridpanel',
							store : 'NanoTrader.store.QuoteListStore',
							columns : [{
										header : 'Symbol',
										dataIndex : 'symbol',
										flex : 2
									}, {
										header : 'Price',
										dataIndex : 'price',
										flex : 1
									}],
							initComponent : function() {
								var store = Ext.data.StoreManager
										.lookup('NanoTrader.store.QuoteListStore');
								store.load();
								this.callParent(arguments);
							},
							renderTo : Ext.getBody()
						}, {
							title : 'Portfolio',
							html : 'Portfolio'
						}, {
							title : 'Trade',
							html : 'Trade'
						}, {
							title : 'Help',
							html : 'Help'
						}]
					}, {
						region : 'south',
						xtype : 'panel',
						html : 'All Rights Reserved by VMware'
					}],
					renderTo : Ext.getBody()
				})
	}
});