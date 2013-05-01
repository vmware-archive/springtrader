Ext.define('SpringTrader.model.User', {
    extend: 'Ext.data.Model',
    requires: ['SpringTrader.validation.Numeric'],
    config: {
        idProperty: 'userid',
        fields: [
            { name: 'fullname', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'passwd', type: 'string' },
            { name: 'userid', type: 'string' },
            { name: 'creditcard', type: 'string', defaultValue: '1234123412341234' },
            { name: 'address', type: 'string' },

            // Returned from backend through login
            { name: 'authToken', type: 'string', persist: false},
            { name: 'profileid', type: 'int', persist: false},
            { name: 'accountid', type: 'int', persist: false},

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
            },

            // properties from api/account/{accountid}/portfolioSummary
//            { name: 'gain', type: 'int', persist: false },
//            { name: 'totalMarketValue', type: 'int', persist: false },
//            { name: 'totalBasis', type: 'int', persist: false },
//            { name: 'numberOfHoldings', type: 'int', persist: false },

        ],
        validations: [
            { type: 'presence', field: 'fullname'},
            { type: 'presence', field: 'email'},
            { type: 'presence', field: 'passwd'},

            { type: 'presence', field: 'userid'},
            { type: 'presence', field: 'accounts', message: 'opening balance must be present' },
            { type: 'presence', field: 'address'},

            { type: 'email', field: 'email'},
            { type: 'numeric', field: 'openbalance', message: 'must be numeric'},
        ],
        proxy: {
            type: 'ajax',
            url: '/spring-nanotrader-services/api/accountProfile',
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
        return !!this.get('authToken');
    },

    logout: function (success) {
        var me = this;
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/logout',
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': this.get('authToken')},
            disableCaching: false,
            success: function (response) {
                me.updateAuthData({});
                if (success) {
                    success();
                }
            },
            failure: function (response) {
                console.log('logout failure', response);
            }
        });
    },

    loadAccountData: function (success) {
        var me = this;
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/account/' + this.get('accountid'),
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': this.get('authToken')},
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
            'authToken': data.authToken,
            'profileid': data.profileid,
            'accountid': data.accountid
        });
    },

    updateAccountData: function(data) {
        this.set('creationdate', data.creationdate);
        this.set('lastlogin', data.lastlogin);
        this.set('logincount', data.logincount);
        this.set('balance', data.balance);
        this.set('openbalance', data.openbalance);
    }
});
