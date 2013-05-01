Ext.define('SpringTrader.view.AccountSummary', {
    extend: 'Ext.Component',
    xtype: 'accountsummary',
    requires: ['Ext.XTemplate'],
    config: {
        scrollable: false,
        styleHtmlContent: true,
        height: '100%',
        bodyPadding: 0,
        cls: 'well show-well',
        tpl: Ext.create('Ext.XTemplate',
                '<div class="title"><h3>Account Summary</h3></div>' +
                '<div class="table-outer">' +
                '<table class="table table-condensed">' +
                '<tbody>' +
                '<tr><th>Current Balance</th><td>{currentbalance:this.currency}</td></tr>' +
                '<tr><th>Opening Balance</th><td>{openbalance:this.currency}</td></tr>' +
                '<tr><th>Cash Balance</th><td>{cashbalance:this.currency}</td></tr>' +
                '<tr><th>Total of Holdings</th><td>{totalholdings:this.currency}</td></tr>' +
                '<tr class={[ values.netgain >= 0 ? "green" : "red" ]}>' +
                '<th>Current Gain/Loss</th><td>{netgain:this.currency}</td></tr>' +
                '</tbody>' +
                '</table>' +
                '</div>',
            {
                currency: function(v) { return '$' + v.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1,'); }
            }
        )
    },
    updateView: function(accountSummary) {
        this.setData({
            currentbalance: accountSummary.currentBalance(),
            openbalance: accountSummary.openBalance(),
            cashbalance: accountSummary.cashBalance(),
            totalholdings: accountSummary.totalHoldings(),
            netgain: accountSummary.netGain()
        });
        this.show();

    }
});