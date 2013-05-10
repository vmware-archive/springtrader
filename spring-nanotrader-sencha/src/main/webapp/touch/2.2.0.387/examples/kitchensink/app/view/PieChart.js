/**
 * Demonstrates how use Ext.chart.series.Pie
 */
    //<feature charts>
Ext.define('Kitchensink.view.PieChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 'Ext.chart.interactions.Rotate'],
    config: {
        cls: 'card1',
        layout: 'fit',
        style: 'background: white',
        items: [
            {
                xtype: 'toolbar',
                top: 0,
                right: 0,
                zIndex: 50,
                style: {
                    background: 'none'
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconCls: 'refresh',
                        text: 'Refresh',
                        handler: function () {
                            Ext.getStore('Pie').generateData(9);
                        }
                    },
                    {
                        text: 'Reset',
                        handler: function () {
                            //ensure the query gets the chart for this kitchensink example
                            var chart = Ext.ComponentQuery.query('polar', this.getParent().getParent())[0];
                            
                            //reset the rotation
                            Ext.ComponentQuery.query('series', chart)[0].setRotation(0);
                            
                            //reset the legend
                            chart.resetLegendStore();
                        }
                    }
                ]
            },
            {
                xtype: 'polar',
                store: 'Pie',
                colors: Kitchensink.view.ColorPatterns.getBaseColors(),
                interactions: ['rotate', 'itemhighlight'],
                legend: {
                    docked: 'right',
                    verticalWidth: 100
                },
                innerPadding: 45,
                series: [
                    {
                        type: 'pie',
                        xField: 'g1',
                        labelField: 'name',
                        donut: 30,
                        highlightCfg: {
                            margin: 20
                        },
                        style: {
                            stroke: 'white',
                            miterLimit: 10,
                            lineCap: 'miter',
                            lineWidth: 2
                        }
                    }
                ],
                axes: [
                ]
            }
        ]
    },
    initialize: function () {
        this.callParent();
        Ext.getStore('Pie').generateData(9);
    }
});
//</feature>
