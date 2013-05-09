Ext.define('SpringTrader.model.Holding', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['purchaseprice', 'quantity', 'quote']
    },
    symbol: function() {
        return this.get('quote').symbol;
    },
    price: function() {
        return this.get('quote').price;
    },
    quantity: function() {
        return this.get('quantity');
    },
    value: function() {
        return this.price() * this.quantity();
    },
    basisValue: function() {
        return this.get('purchaseprice') * this.quantity();
    },
    netgain: function() {
        return this.value() - this.basisValue();
    }
});