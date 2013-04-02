// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': '../touch/src',
    'SpringTrader': '../app'
});
//</debug>

Ext.application({
    name: 'SpringTrader',

    requires: [
        'Ext.MessageBox'
    ],

	models: [
		'MarketSummary'
	],

    views: [
        'Main'
    ],

    launch: function() {
		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
		jasmine.getEnv().execute();
    }
});
