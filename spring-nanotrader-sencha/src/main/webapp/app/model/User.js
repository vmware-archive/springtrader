Ext.define('SpringTrader.model.User', {
    extend: 'Ext.data.Model',
    requires: ['SpringTrader.validation.Numeric', 'SpringTrader.model.HoldingSummary'],
    config: {
        idProperty: 'profileid',
        fields: [
            { name: 'fullname', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'passwd', type: 'string' },
            { name: 'userid', type: 'string' },
            { name: 'creditcard', type: 'string', defaultValue: '1234123412341234' },
            { name: 'address', type: 'string' },

            // Returned from backend through login
            { name: 'authToken', type: 'string', persist: false},
            { name: 'profileid', type: 'auto', persist: false },
            { name: 'accountid', type: 'auto', persist: false },

            // Returned from backend through api/account/{accountid}
            { name: 'balance', type: 'float', persist: false },
            { name: 'creationdate', type: 'string', persist: false },
            { name: 'lastlogin', type: 'string', persist: false },
            { name: 'logincount', type: 'int', persist: false },
            { name: 'accounts' },
            { name: 'openbalance', type: 'float', persist: false, convert: function (value, record) {
                // The accounts attribute is required for creation, but then never used again
                if (value !== undefined && value != null) {
                    record.set('accounts', [
                        {"openbalance": value.toString()}
                    ]);
                }
                return value;
            }
            }
        ],
        validations: [
            { type: 'presence', field: 'fullname'},
            { type: 'presence', field: 'email'},
            { type: 'presence', field: 'passwd'},

            { type: 'presence', field: 'userid'},
            { type: 'presence', field: 'accounts', message: 'opening balance must be present' },
            { type: 'presence', field: 'address'},

            { type: 'email', field: 'email'},
            { type: 'numeric', field: 'openbalance', message: 'must be numeric'}
        ],
        proxy: {
            type: 'rest',
            url: '/spring-nanotrader-services/api/accountProfile',
            headers: {'Content-Type': 'application/json' },
            noCache: false
        }
    },

    init: function() {
        this.accountSummary = Ext.create('SpringTrader.model.AccountSummary');
        this.accountSummary.user = this;

        this.holdingSummary = Ext.create('SpringTrader.model.HoldingSummary');
        this.holdingSummary.user = this;
    },

    statics: {
        authenticate: function (user, success, failure) {
            Ext.Ajax.request({
                url: '/spring-nanotrader-services/api/login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                disableCaching: false,
                jsonData: {
                    username: user.get('userid'),
                    password: user.get('passwd')
                },
                success: function (response) {
                    var jsonData = Ext.JSON.decode(response.responseText);
                    user.updateAuthData(jsonData);
                    if (success) {
                        success(response);
                    }
                },
                failure: function (response) {
                    if (failure) {
                        failure(response);
                    }
                }
            });
        }
    },

    authenticated: function () {
        return !!this.authToken();
    },

    accountId: function() {
      return this.get('accountid');
    },

    authToken: function() {
        return this.get('authToken');
    },

    profileId: function () {
        return this.get('profileid');
    },

    logout: function (callback) {
        var me = this;
        if (me.authenticated()) {
            Ext.Ajax.request({
                url: '/spring-nanotrader-services/api/logout',
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'API_TOKEN': this.authToken()},
                disableCaching: false,
                success: function (response) {
                    if (callback) {
                        callback();
                    }
                },
                failure: function (response) {
                    console.log('logout failure', response);
                    if (callback) {
                        callback();
                    }
                }
            });
        }
        me.updateAuthData({});
    },

    loadProfileData: function (successFn, failureFn) {
        var me = this;
        me.getProxy().getHeaders().API_TOKEN = SpringTrader.user.authToken();
        SpringTrader.model.User.load(SpringTrader.user.getId(), {
            success: function(record) {
                me.updateProfileData(record.raw);
                if (successFn) { successFn(); }
            },
            failure: function() {
                if (failureFn) { failureFn(); }
            }
        });
    },

    loadAccountData: function (success) {
        var me = this;
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/account/' + this.accountId(),
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': this.authToken()},
            disableCaching: false,
            success: function (response) {
                var jsonData = Ext.JSON.decode(response.responseText);
                me.updateAccountData(jsonData);
                if (success) {
                    success(response);
                }
            }
        });
    },

    updateAuthData: function (data) {
        this.set({
            authToken: data.authToken,
            profileid: parseInt(data.profileid),
            accountid: parseInt(data.accountid)
        });
    },

    updateAccountData: function(data) {
        this.set({
            creationdate: data.creationdate,
            lastlogin: data.lastlogin,
            logincount: data.logincount,
            balance: data.balance,
            openbalance: data.openbalance            
        });
    },

    updateProfileData: function(data) {
        this.set({
            address: data.address,
            creditcard: data.creditcard,
            email: data.email,
            fullname: data.fullname,
            userid: data.userid,
            passwd: data.passwd
        });
        // Make user model phantom to let the proxy set PUT request type
        this.phantom = false;
    }
});
