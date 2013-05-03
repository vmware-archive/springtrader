Ext.define('SpringTrader.view.DailyTopGains',{
    extend: 'SpringTrader.view.PieChart',
    xtype: 'dailytopgains',
    config: {
        store: 'holdingsummary',
        series: [{
            type: 'pie',
            xField: 'percent',
            showInLegend: true,
            labelField: 'symbol',
            donut: 30
        }]
    },
    hide: function() {
        this.callParent(arguments);
        this.getLegend().hide();
    }

});