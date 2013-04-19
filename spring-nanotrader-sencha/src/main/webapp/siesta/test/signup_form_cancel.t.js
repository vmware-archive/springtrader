StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#signupButton' },
        { action: 'tap', target: '>> #signupButton' },
        { waitFor: 'componentVisible', args: 'signupPage'},
        function(next) {
            t.cq1('navigationview').getNavigationBar().getBackButton().fireEvent('tap');
            next();
        },
        { waitFor: 'componentVisible', args: '#signupButton' },
        function(next) {
            t.pass('User can cancel sign up form');
        }
    )
});