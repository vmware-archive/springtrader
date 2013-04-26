Ext.define('SpringTrader.view.LoggedOut', {
    extend: 'Ext.Container',
    xtype: 'loggedoutview',
    config: {
        scrollable: true,
        height: '100%',
        items: [
            { xtype: 'marketsummary' },
            { xtype: 'signupbutton' }]
    }
});