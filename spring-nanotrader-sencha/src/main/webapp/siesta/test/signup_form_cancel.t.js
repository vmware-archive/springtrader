StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#showSignupFormButton' },
        { action: 'tap', target: '>> #showSignupFormButton' },
        { waitFor: 'componentVisible', args: 'signupform'},
        { action: 'tap', target: '>> signupform #cancelButton' },
        { waitFor: 'componentVisible', args: '#showSignupFormButton' },
        function(next) {
            t.pass('User can cancel sign up form');
        }
    )
});