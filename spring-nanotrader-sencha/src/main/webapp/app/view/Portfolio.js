Ext.define('SpringTrader.view.Portfolio', {
    extend: 'Ext.Container',
    xtype: 'portfolioPage',
    requires: ['Ext.SegmentedButton'],
    config: {
        title: 'Portfolio',
        iconCls: 'user',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'center'
        },
        scrollable: true,
        items: [
            {
                xtype: 'segmentedbutton',
                itemId: 'portfolioswitch',
                margin: '10 0 10 0',
                items: [
                    { text: 'Summary', pressed: true, data: {ref: 'summary'} },
                    { text: 'Holdings', data: {ref: 'holdings'}}
                ]
            },
            {
                xtype: 'portfoliosummary'
            },
            {
                xtype: 'portfolioholdings',
                hidden: true
            }
        ]
    }
});