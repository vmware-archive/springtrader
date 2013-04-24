StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#signupButton' },
        { action: 'tap', target: '>> #signupButton' },
        { waitFor: 'componentVisible', args: 'signupPage'},

        function(next) {
            t.signup(t.user());
            next();
        },

        { action: 'tap', target: '>> #signupSubmitBtn' },

        function(next) {
            t.pass('User can fill out fields');
        }
    )
});