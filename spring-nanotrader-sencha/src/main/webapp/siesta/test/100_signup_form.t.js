StartTest(function(t) {
    t.chain(
        { waitFor: 'componentVisible', args: '#signupButton' },
        { action: 'tap', target: '>> #signupButton' },
        { waitFor: 'componentVisible', args: 'signupPage'},

        function(next) {
            t.cq1('field[name=name]').setValue('John Doe');
            t.cq1('field[name=email]').setValue('user@example.com');
            t.cq1('field[name=password]').setValue('password');
            t.cq1('field[name=confirmpassword]').setValue('password');
            t.cq1('field[name=username]').setValue('john-doe');
            t.cq1('field[name=openbalance]').setValue('100000');
            next();
        },

        function(next) {
            t.pass('User can fill out fields');
        }
    )
});