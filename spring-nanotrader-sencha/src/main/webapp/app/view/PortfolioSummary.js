Ext.define('SpringTrader.view.PortfolioSummary', {
    extend: 'Ext.Component',
    xtype: 'portfoliosummary',
    requires: ['Ext.XTemplate'],
    config: {
        scrollable: false,
        styleHtmlContent: true,
        height: '100%',
        width: '100%',
        bodyPadding: 0,
        cls: 'well show-well',
        tpl: Ext.create('Ext.XTemplate',
            '<div class="title"><h3>Portfolio Summary</h3></div>' +
                '<div class="table-outer">' +
                '<table class="table table-condensed">' +
                '<tbody>' +
                '<tr><th>Number of Holdings</th><td class="right">{numberOfHoldings}</td></tr>' +
                '<tr><th>Purchase Basis</th><td class="right">{totalBasis:this.currency}</td></tr>' +
                '<tr><th>Market Value</th><td class="right">{totalHoldings:this.currency}</td></tr>' +
                '<tr class="{[ values.netGain >= 0 ? "green-color" : "red-color" ]}">' +
                '<th>Total Gain/Loss</th><td class="right">{netGain:this.currency}</td></tr>' +
                '</tbody>' +
                '</table>' +
                '</div>',
            {
                currency: function(v) { return '$' + v.toFixed(2).replace(/(\d)(?=(\d{3})+\b)/g,'$1,'); }
            }
        )
    },
    updateView: function(portfolioSummary) {
        this.setData({
            numberOfHoldings: portfolioSummary.numberOfHoldings(),
            totalBasis: portfolioSummary.totalBasis(),
            totalHoldings: portfolioSummary.totalHoldings(),
            netGain: portfolioSummary.netGain()
        });
        this.show();
    }
});