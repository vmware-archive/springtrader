Ext.define('SpringTrader.view.UserStats', {
    extend: 'Ext.Component',
    xtype: 'userstats',
    config: {
        scrollable: false,
        styleHtmlContent: true,
        height: '100%',
        tpl: [
            '<div class="well show-well">' +
                '<div class="title"><h3>User Statistics</h3></div>' +
                '<div class="table-outer">' +
                '<table class="table table-condensed">' +
                '<tbody>' +
                '<tr><td>Account ID</td><td>{accountid}</td></tr>' +
                '<tr><td>Creation Date</td><td>{creationdate}</td></tr>' +
                '<tr><td>Last Login</td><td>{lastlogin}</td></tr>' +
                '<tr><td>Login count</td><td>{logincount}</td></tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>'
        ]
    },
    updateView: function(user) {
        this.setData({
            accountid: user.get('accountid'),
            creationdate: user.get('creationdate'),
            lastlogin: user.get('lastlogin'),
            logincount: user.get('logincount')
        });
        this.show();
    }

});