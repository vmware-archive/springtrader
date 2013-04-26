Ext.define('SpringTrader.view.LoggedOut', {
    extend: 'Ext.Container',
    xtype: 'loggedoutview',
    config: {
        items: [
            { xtype: 'marketsummary' },
            { xtype: 'signupbutton' }]
    }
});