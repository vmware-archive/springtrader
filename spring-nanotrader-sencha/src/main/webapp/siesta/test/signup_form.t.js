StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#showSignupFormButton' },
        { waitFor: 'componentVisible', args: '#loginButton'},


        { action: 'tap', target: '>> #showSignupFormButton' },
        { waitFor: 'componentVisible', args: 'signupform'},

        function(next) {
            t.signup(t.user());
            next();
        },

        { action: 'tap', target: '>> #signupSubmitButton' },

        function(next) {
            t.is(t.cq1('signupbutton'), undefined, 'The sign up form should not be present');
            t.is(t.cq1('#loginButton').getHidden(), true, 'The login button should not be present');
            next();
        },

        { waitFor: 'componentVisible', args: 'maintabpanel > tabbar'},

        function(next) {
            t.pass('User can sign up');
        }
    )
});