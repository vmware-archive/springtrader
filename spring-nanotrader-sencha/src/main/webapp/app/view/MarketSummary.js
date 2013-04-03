Ext.define('SpringTrader.view.MarketSummary', {
	extend: 'Ext.Container',
	xtype: 'marketsummary',
	config: {
		defaults: {
			margin: 10
		},
		tpl: Ext.create('Ext.Template', 
		       '<div>',
		         '<dl class="dl-horizontal">',
		            '<dt>Index</dt><dd>{index}</dd>',
		            '<dt>Volume</dt><dd>{volume}</dd>',
		            '<dt>Change</dt><dd>{change}</dd>',
		          '</dl>',
		       '</div>'
		),
		data: { index: '-', volume: '-', change: '-'}
	}
});
