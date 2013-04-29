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
                    user.set('authToken', jsonData.authToken);
                    user.set('profileid', jsonData.profileid);
                    user.set('accountid', jsonData.accountid);
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
                me.set('authToken', null);
                me.set('profileid', null);
                me.set('accountid', null);
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
                me.set('creationdate', jsonData.creationdate);
                me.set('lastlogin', jsonData.lastlogin);
                me.set('logincount', jsonData.logincount);
                me.set('balance', jsonData.balance);
                me.set('openbalance', jsonData.openbalance);
                if (success) {
                    success(response);
                }
            }
        });
    }
});
