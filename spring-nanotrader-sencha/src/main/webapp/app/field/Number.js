Ext.define('SpringTrader.field.Number', {
    extend: 'Ext.form.Text',
    xtype: 'stnumberfield',
    config: {
        pattern: '[0-9]*'
    },
    updatePattern : function(pattern) {
        var component = this.getComponent();

        component.updateFieldAttribute('pattern', pattern);
    },

    initialize: function() {
        this.callParent(arguments);

        var component = this.getComponent();

        component.input.on({
            scope: this,
            keydown : 'onKeyDown'
        })
    },

    onKeyDown: function(e) {
        var code = e.browserEvent.keyCode;

        if (
            !(code >= 48 && code <= 57) &&
            !(code >= 96 && code <= 105) &&
              code !== 46 &&
              code !== 8
            ) {
            e.stopEvent();
        }
    }
});