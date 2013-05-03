Class('SpringTrader.SiestaTestHelper', {
    isa: Siesta.Test.SenchaTouch,

    override: {
        isReady: function() {
            var result = this.SUPERARG(arguments);
            if(!result.ready) return result;

            if (SpringTrader.user) {SpringTrader.user.set('authToken', null)};
            if (SpringTrader.appStore) {
                SpringTrader.appStore.remove('authToken');
                SpringTrader.appStore.remove('accountid');
                SpringTrader.appStore.remove('profileid');
            }

            return { ready: true }
        }
    },
    methods: {
        signup: function(user) {
            this.cq1('field[name=fullname]').setValue(user.fullname);
            this.cq1('field[name=email]').setValue(user.email);
            this.cq1('field[name=passwd]').setValue(user.password);
            this.cq1('field[name=passwdconfirm]').setValue(user.password);
            this.cq1('field[name=userid]').setValue(user.userid);
            this.cq1('field[name=openbalance]').setValue(user.balance);
            this.cq1('field[name=address]').setValue(user.address);
        },

        user: function(options) {
            options = options || {};
            var userid = 'user' + this.userId();
            var email = userid + '@example.com';

            return jQuery.extend({
                fullname: 'John Doe',
                email: email,
                password: 'password',
                userid: userid,
                balance: 1000000000,
                address: 'San Francisco',
                creditcard: 1234123412341234
            }, options);
        },

        userId: function() {
            return new Date().getTime();
        },

        login: function(user) {
            this.cq1('field[name=userid]').setValue(user.userid);
            this.cq1('field[name=passwd]').setValue(user.passwd);
        }

    }
});