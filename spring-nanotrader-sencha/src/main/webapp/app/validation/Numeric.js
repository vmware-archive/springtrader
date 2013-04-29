Ext.define('SpringTrader.validation.Numeric', {
    requires: ['Ext.data.Validations']
}, function () {
    SpringTrader.validation.Numeric = null;

    Ext.applyIf(Ext.data.Validations, {
        numeric: function (config, value) {
            if (value === undefined || value === null) {
                return false;
            }
            return !isNaN(parseFloat(value));
        }
    });
});