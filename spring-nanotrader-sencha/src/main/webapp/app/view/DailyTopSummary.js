Ext.define('SpringTrader.view.DailyTopSummary',{
    extend: 'Ext.chart.PolarChart',
    xtype: 'dailytopsummary',
    config: {
        interactions: ['rotate'],
        store: 'holdingsummary',
        height: 200,
        colors: [
            "#115fa6",
            "#94ae0a",
            '#a61120'
        ],
        series: [{
            type: 'pie',
            xField: 'percent',
            labelField: 'symbol'
        }]
    }

});