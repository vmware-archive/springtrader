Ext.define('SpringTrader.view.PieChart',{
    extend: 'Ext.chart.PolarChart',
    config: {
        interactions: ['rotate'],
        height: 200,
        colors: [
            "#115fa6",
            "#94ae0a",
            '#a61120'
        ]
    }

});