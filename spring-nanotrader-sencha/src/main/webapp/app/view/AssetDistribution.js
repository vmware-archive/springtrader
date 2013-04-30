Ext.define('SpringTrader.view.AssetDistribution',{
    extend: 'Ext.chart.PolarChart',
    xtype: 'assetdistribution',
    config: {
        interactions: ['rotate'],
        store: 'assetdistribution',
        height: 200,
        colors: [
            "#115fa6",
            "#94ae0a"
        ],
        series: [{
            type: 'pie',
            xField: 'value',
            labelField: 'name'
        }]
    }

});