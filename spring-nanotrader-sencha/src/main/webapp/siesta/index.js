var Harness = Siesta.Harness.Browser.SenchaTouch;

Harness.configure({
    title: 'Spring Trader Sencha Touch',
    testClass: SpringTrader.SiestaTestHelper,
//    autoRun: true
});

// NOTE: This harness assumes you have a local Sencha Touch 2.x SDK at the same place as your Siesta folder.

Harness.start(
    {
        group: 'Spring Trader',
        hostPageUrl: '/spring-nanotrader-sencha/index.html',
        preload: [],
        performSetup: false,
        waitForAppReady: true,
        items: [
            'test/signup_form_cancel.t.js',
            'test/signup_form.t.js',
            'test/signup_form_invalid.t.js',
            'test/signup_duplicate_userid.t.js',
            'test/login_successful.t.js',
            'test/login_failure.t.js',
        ]
    }
);
// eof Harness.start
