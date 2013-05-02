Ext.define('SpringTrader.view.AssetDistribution',{
    extend: 'SpringTrader.view.PieChart',
    xtype: 'assetdistribution',
    config: {
        store: 'assetdistribution',
        series: [{
            type: 'pie',
            xField: 'value',
            showInLegend: true,
            labelField: 'name',
            donut: 30
        }]
    }

});