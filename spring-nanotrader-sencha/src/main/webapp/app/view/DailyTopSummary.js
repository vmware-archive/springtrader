Ext.define('SpringTrader.view.DailyTopSummary',{
    extend: 'SpringTrader.view.PieChart',
    xtype: 'dailytopsummary',
    config: {
        store: 'holdingsummary',
        series: [{
            type: 'pie',
            xField: 'percent',
            labelField: 'symbol'
        }]
    }

});