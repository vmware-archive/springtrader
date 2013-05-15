Ext.define('SpringTrader.model.Order', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'orderid',
        fields: [ "quote", "quantity", "ordertype", "orderstatus" ]
    },

    symbol: function(){
        return this.get('quote').symbol;
    },

    quantity: function() {
        return this.get('quantity');
    },

    type: function() {
        return this.get('ordertype');
    },

    status: function() {
        return this.get('orderstatus');
    }
});