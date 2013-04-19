Ext.define('SpringTrader.model.User', {
    extend: 'Ext.data.Model',
    requires: ['SpringTrader.validation.AccountBalance'],
    config: {
        idProperty: 'userid',
        fields: [
            { name: 'fullname', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'passwd', type: 'string' },
            { name: 'userid', type: 'string' },
            { name: 'accounts' },
            // Make the field persist to avoid synchronizing this field into server
            { name: 'openbalance', persist: false, convert: function (value, record) {
                if (value !== undefined && value != null) {
                    record.set('accounts', [ {"openbalance": value.toString()} ]);
                }
            }},
            { name: 'creditcard', type: 'string', default: '1234123412341234' },
            { name: 'address', type: 'string' }
        ],
        validations: [
            { type: 'presence', field: 'fullname'},
            { type: 'presence', field: 'email'},
            { type: 'presence', field: 'passwd'},

            { type: 'presence', field: 'userid'},
            { type: 'presence', field: 'accounts', message: 'opening balance must be present' },
            { type: 'presence', field: 'creditcard'},
            { type: 'presence', field: 'address'},

            { type: 'email', field: 'email'},

            { type: 'accountbalance', field: 'accounts', message: 'opening balance must be numeric' }
        ],
        proxy: {
            type: 'ajax',
            url: '/spring-nanotrader-services/api/accountProfile',
            noCache: false
        }
    }
});
