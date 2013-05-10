/**
 * Demonstrates how use Ext.chart.series.Pie
 */
//<feature charts>

var drawPerimeter = function (color, width) {
    return {strokeStyle:color, strokeOpacity:1, lineWidth:width, fillOpacity:0};
};

var drawStroke = function (color, width) {
    return {strokeStyle:color, strokeOpacity:1, lineWidth:width*2};
};

Ext.define('Kitchensink.view.GaugeChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.SpaceFillingChart', 'Ext.chart.series.Gauge'],
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
                            Ext.getStore('Pie').generateData(1);
                        }
                    }
                ]
            },
            {
                layout: 'vbox',
                items: [
                    {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'spacefilling',
                                flex: 1,
                                store: 'Pie',
                                animate: {
                                    easing: 'elasticIn',
                                    duration: 1000
                                },
                                series: [
                                    {
                                        type: 'gauge',
                                        field: 'g1',
                                        minimum: 100,
                                        maximum: 800,
                                        donut: 30,
                                        colors: ["#115fa6", "lightgrey"],
                                    }
                                ]
                            },
                            {
                                xtype: 'spacefilling',
                                flex: 1,
                                store: 'Pie',
                                animate: {
                                    easing: 'bounceOut',
                                    duration: 500
                                },
                                colors: ["red", "lightgrey"],
                                series: [
                                    {
                                        type: 'gauge',
                                        field: 'g1',
                                        minimum: 100,
                                        maximum: 800,
                                        needle: true,
                                        donut: 30,
                                        style: {
                                            lineWidth: 8
                                        }
                                    }
                                ],
                                axes: [
                                ]
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'spacefilling',
                                flex: 1,
                                store: 'Pie',
                                colors: ["#115fa6", "lightgrey"],
                                series: [
                                    {
                                        type: 'gauge',
                                        field: 'g1',
                                        donut: 30,
                                        needleLength: 100,
                                        minimum: 100,
                                        maximum: 800,
                                        totalAngle: Math.PI,
                                    }
                                ]
                            },
                            {
                                xtype: 'spacefilling',
                                flex: 1,
                                store: 'Pie',
                                series: [{
                                    type: 'gauge',
                                    field: 'g1',
                                    donut: 30,
                                    value: 60,
                                    minimum: 100,
                                    maximum: 800,
                                    needle: true,
                                    needleLength: 95,
                                    needleWidth: 8,
                                    totalAngle: Math.PI,
                                    label: {fontSize:12, fontWeight:'bold'},
                                    colors: ['maroon', 'blue', 'lightgray', 'red'],
                                    sectors: [ 
                                        {end:300, label:'Cold',  color:'dodgerblue'}, {end:300, style:drawStroke('black', 2)},
                                        {end:600, label:'Temp.', color:'lightgray'},  {end:600, style:drawStroke('black', 2)},
                                        {end:800, label:'Hot',   color:'tomato'},     {start:0, style:drawPerimeter('gray', 4)}
                                    ],
                                    renderer: function(sprite, config, rendererData, spriteIndex) {
                                        var surface = sprite.getParent(),
                                            chart = rendererData.series.getChart(),
                                            mainRegion = chart.getMainRegion(),
                                            width = mainRegion[2],
                                            height = mainRegion[3],
                                            bigChart = (width >= 250 && height >= 150),
                                            changes, fontSize;
                                        // This renderer function draws the "Temp." label in big white letters,
                                        // the "Cold" label in blue, and the "Hot" label in red.
                                        if (config.type == "label") {
                                            changes = {x:config.x+10, y:config.y+10};
                                            if (spriteIndex == 3) {
                                                Ext.apply(changes, {fontSize:(bigChart?32:16), strokeStyle:'black'});
                                            } else {
                                                Ext.apply(changes, {fontSize:(bigChart?24:12)});
                                            }
                                            switch (spriteIndex) {
                                                case 1: Ext.apply(changes, {color:'blue'});     break;
                                                case 3: Ext.apply(changes, {color:'white'});    break;
                                                case 5: Ext.apply(changes, {color:'darkred'});  break;
                                            }
                                            return changes;
                                        }
                                    },
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    initialize: function () {
        this.callParent();
        Ext.getStore('Pie').generateData(1);
    }
});
//</feature>
