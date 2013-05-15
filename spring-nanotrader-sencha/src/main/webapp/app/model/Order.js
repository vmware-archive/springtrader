Ext.define('SpringTrader.model.Order', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'orderid',
        fields: [ "quote", "quantity", "ordertype", "orderstatus", "opendate", "completiondate", "orderfee" ]
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
    },

    detail: function() {
        return {
            creationdate: this.get('opendate'),
            symbol: this.symbol(),
            quantity: this.quantity(),
            completiondate: this.get('completiondate'),
            type: this.type(),
            orderid: this.getId(),
            status: this.status(),
            transactionfee: this.get('orderfee')
        }
    }
});