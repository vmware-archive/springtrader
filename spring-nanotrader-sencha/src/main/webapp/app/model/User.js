Ext.define('SpringTrader.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'fullname', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'passwd', type: 'string' },
            { name: 'userid', type: 'string' },
            { name: 'accounts' },
            { name: 'creditcard', type: 'string', default: '1234123412341234' },
            { name: 'address', type: 'string' }
        ],
        validations: [
            { type: 'presence', field: 'fullname'},
            { type: 'presence', field: 'email'},
            { type: 'presence', field: 'passwd'},
            { type: 'presence', field: 'userid'},
            { type: 'presence', field: 'accounts' },
            { type: 'presence', field: 'creditcard'},
            { type: 'presence', field: 'address'},

            { type: 'email', field: 'email'},

            { type: 'accountbalance', field: 'accounts', message: 'opening balance must be numeric' }
        ]
    }
});

/* Doesn't really belong here, but we don't have a way to load it elsewhere */
Ext.applyIf(Ext.data.Validations, {
    accountbalance: function (config, value) {
        if (value === undefined || value === null) {
            return false;
        }
        return Ext.Array.every(value, function (account) {
            return !isNaN(parseFloat(account.openbalance));
        });
    }
});
