var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title: 'Spring Trader Sencha Touch',
    transparentEx: false
});

// NOTE: This harness assumes you have a local Sencha Touch 2.x SDK at the same place as your Siesta folder.

Harness.start(
    {
        group: 'Spring Trader',
        hostPageUrl: '/spring-nanotrader-sencha/index.html',
        preload: [],
        performSetup: false,
        items: [
            'test/010_sanity.t.js'
        ]
    }
);
// eof Harness.start
