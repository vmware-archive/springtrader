Ext.define('SpringTrader.validation.AccountBalance', {
    requires: ['Ext.data.Validations']
}, function() {
    SpringTrader.validation.AccountBalance = null;

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
})