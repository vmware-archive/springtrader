StartTest(function(t) {
    // Set the userid, password to use prepopulated data
    var user = {
        userid: 'nanouser1',
        passwd: 'badpassword'
    };
    t.chain(
        { waitFor: 'componentVisible', args: '#loginButton'},


        { action: 'tap', target: '>> mainview #loginButton' },
        { waitFor: 'componentVisible', args: 'loginform'},

        function(next) {
            t.login(user);
            next();
        },

        { action: 'tap', target: '>> loginform #submitButton' },
        { waitFor: 'componentVisible', args: 'sheet[baseCls=x-msgbox]'},

        function(next) {
            var msgBox = t.cq1('sheet[baseCls=x-msgbox]');
            t.is(msgBox.config.title, 'Failure', 'An error message box appears');
            t.is(msgBox.config.message, "The user name or password is incorrect.", 'Error message appear')
            next();
        },

        function(next) {
            t.pass('Backend login failures show an alert dialog.');
        }
    )
});