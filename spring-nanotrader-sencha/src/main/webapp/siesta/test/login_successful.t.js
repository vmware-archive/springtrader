StartTest(function(t) {
    // Set the userid, password to use prepopulated data
    var user = {
        userid: 'nanouser1',
        passwd: 'nano'
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

        { waitFor: 'componentVisible', args: 'maintabpanel > tabbar'},

        function(next) {
            t.is(t.cq1('signupbutton'), undefined, 'The sign up call to action div should not be present');
            t.is(t.cq1('#loginButton').getHidden(), true, 'The login button should not be present');
            next();
        },

        { action: 'tap', target: '>> mainview #logoutButton' },

        { waitFor: 'componentVisible', args: '#loginButton'},
        { waitFor: 'componentVisible', args: 'signupbutton'},

        function(next) {
            t.pass('User can login and logout');
        }
    )
});