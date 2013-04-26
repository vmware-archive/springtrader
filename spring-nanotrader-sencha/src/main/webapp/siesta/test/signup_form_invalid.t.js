StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#showSignupFormButton' },
        { action: 'tap', target: '>> #showSignupFormButton' },
        { waitFor: 'componentVisible', args: 'signupform'},

        { action: 'tap', target: '>> #signupSubmitButton' },
        { waitFor: 'componentVisible', args: 'sheet[baseCls=x-msgbox]' },

        function(next) {
            var msgBox = t.cq1('sheet[baseCls=x-msgbox]');
            t.is(msgBox.config.title, 'Sorry', 'A validation message box appears');
            t.is(msgBox.config.message, "fullname must be present<br/>email must be present<br/>passwd must be present<br/>userid must be present<br/>accounts opening balance must be present<br/>address must be present<br/>email is not a valid email address<br/>accounts opening balance must be numeric<br/>", 'Validation messages appear')
            next();
        },

        { action: 'tap', target: '>> sheet[baseCls=x-msgbox] button'},

        function(next) {
            t.pass('An invalid form shows an error alert');
        }
    )
});