StartTest(function(t) {
    var user = t.user();

    t.chain(
        { waitFor: 'componentVisible', args: '#showSignupFormButton' },
        { action: 'tap', target: '>> #showSignupFormButton' },
        { waitFor: 'componentVisible', args: 'signupform'},

        function(next) {
            t.signup(user);
            next();
        },

        { action: 'tap', target: '>> #signupSubmitButton' },

        { waitFor: 'componentVisible', args: '#showSignupFormButton' },
        { action: 'tap', target: '>> #showSignupFormButton' },
        { waitFor: 'componentVisible', args: 'signupform'},

        function(next) {
            t.signup(user);
            next();
        },

        { action: 'tap', target: '>> #signupSubmitButton' },
        { waitFor: 'componentVisible', args: 'sheet[baseCls=x-msgbox]'},

        function(next) {
            var msgBox = t.cq1('sheet[baseCls=x-msgbox]');
            t.is(msgBox.config.title, 'Whoops', 'An error message box appears');
            t.is(msgBox.config.message, "The record already exists.", 'Error message appear')
            next();
        },

        function(next) {
            t.pass('An duplicate userid form shows an error alert');
        }

    )
});
