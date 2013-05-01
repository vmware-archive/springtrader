Ext.define('SpringTrader.view.UserStats', {
    extend: 'Ext.Component',
    xtype: 'userstats',
    config: {
        scrollable: false,
        styleHtmlContent: true,
        height: '100%',
        cls: 'well show-well',
        tpl: [
                '<div class="title"><h3>User Statistics</h3></div>' +
                '<div class="table-outer">' +
                '<table class="table table-condensed">' +
                '<tbody>' +
                '<tr><th>Account ID</th>   <td>{accountid}</td></tr>' +
                '<tr><th>Creation Date</th><td>{creationdate}</td></tr>' +
                '<tr><th>Last Login</th>   <td>{lastlogin}</td></tr>' +
                '<tr><th>Login count</th>  <td>{logincount}</td></tr>' +
                '</tbody>' +
                '</table>' +
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