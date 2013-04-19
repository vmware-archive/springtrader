StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#signupButton' },
        { action: 'tap', target: '>> #signupButton' },
        { waitFor: 'componentVisible', args: 'signupPage'},

        function(next) {
            t.cq1('field[name=fullname]').setValue('John Doe');
            t.cq1('field[name=email]').setValue('user@example.com');
            t.cq1('field[name=passwd]').setValue('password');
            t.cq1('field[name=passwdconfirm]').setValue('password');
            t.cq1('field[name=userid]').setValue('john-doe');
            t.cq1('field[name=openbalance]').setValue('100000');
            t.cq1('field[name=address]').setValue('San Francisco');
            next();
        },

        { action: 'tap', target: '>> #signupSubmitBtn' },

        function(next) {
            t.pass('User can fill out fields');
        }
    )
});