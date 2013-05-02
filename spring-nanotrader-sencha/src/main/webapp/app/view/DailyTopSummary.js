Ext.define('SpringTrader.view.DailyTopSummary',{
    extend: 'SpringTrader.view.PieChart',
    xtype: 'dailytopsummary',
    config: {
        store: 'holdingsummary',
        series: [{
            type: 'pie',
            xField: 'percent',
            showInLegend: true,
            labelField: 'symbol',
            donut: 30
        }]
    }

});