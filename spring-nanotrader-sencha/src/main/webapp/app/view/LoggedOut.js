Ext.define('SpringTrader.view.LoggedOut', {
    extend: 'Ext.Container',
    xtype: 'loggedoutview',
    requires: ['SpringTrader.view.MarketSummary'],
    config: {
        scrollable: true,
        height: '100%',
        items: [
            { xtype: 'marketsummary' },
            { xtype: 'signupbutton' }]
    }
});