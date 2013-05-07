/**
 * Demonstrates how use Ext.chart.series.Line with a renderer function
 */
//<feature charts>
Ext.define('Kitchensink.view.LineChartWithRenderer', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.series.Line', 'Ext.chart.axis.Numeric', 'Ext.draw.modifier.Highlight',
               'Ext.chart.axis.Time', 'Ext.chart.interactions.ItemHighlight'],
    config: {
        cls: 'card1',
        layout: 'fit',
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
                        iconMask: true,
                        text: 'Refresh',
                        handler: function (a, b, c, d, e) {
                            Ext.getStore('Pie').generateData(10);
                        }
                    }
                ]
            },
            {
                xtype: 'chart',
                store: 'Pie',
                series: [
                    {
                        type: 'line',
                        xField: 'name',
                        yField: 'g1',
//                      step:true,
//                      smooth: true,
                        style: {
                            stroke: 'powderblue',
                            fill: 'aliceblue',
                            lineWidth: 4
                        },
                        marker: {
                            type: 'circle',
                            fill: 'yellow',
                            radius: 10,
                        },
                        renderer: function(sprite, config, rendererData, index) {
                            var store = rendererData.store,
                                storeItems = store.getData().items,
                                currentRecord = storeItems[index],
                                previousRecord = (index > 0 ? storeItems[index-1] : currentRecord),
                                current = currentRecord && currentRecord.data['g1'],
                                previous = previousRecord && previousRecord.data['g1'],
                                changes = {};
                            switch(config.type) {
                                case "marker":
                                    if (index == 0) {
                                        return null; // keep the default style for the first marker
                                    }
                                    changes.strokeStyle = (current >= previous ? 'green' : 'red');
                                    changes.fillStyle = (current >= previous ? 'palegreen' : 'lightpink');
                                    changes.lineWidth = 2;
                                    break;
                                case "line":
                                    changes.strokeStyle = (current >= previous ? 'green' : 'red');
                                    changes.fillStyle = (current >= previous ? 'palegreen' : 'tomato');
                                    changes.fillOpacity = .1;
                                    break;
                            }
                            return changes;
                        }



                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1'],
                        minimum: 0
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name'
                    }
                ]
            }
        ]
    },
    initialize: function () {
        this.callParent();
        Ext.getStore('Pie').generateData(10);
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        if (toolbar && interaction && !interaction.isMultiTouch()) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});
//</feature>
