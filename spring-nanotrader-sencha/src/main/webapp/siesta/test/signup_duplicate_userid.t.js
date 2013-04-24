StartTest(function(t) {
    var user = t.user();

    t.chain(
        { waitFor: 'componentVisible', args: '#signupButton' },
        { action: 'tap', target: '>> #signupButton' },
        { waitFor: 'componentVisible', args: 'signupPage'},

        function(next) {
            t.signup(user);
            next();
        },

        { action: 'tap', target: '>> #signupSubmitBtn' },

        { waitFor: 'componentVisible', args: '#signupButton' },
        { action: 'tap', target: '>> #signupButton' },
        { waitFor: 'componentVisible', args: 'signupPage'},

        function(next) {
            t.signup(user);
            next();
        },

        { action: 'tap', target: '>> #signupSubmitBtn' },
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
