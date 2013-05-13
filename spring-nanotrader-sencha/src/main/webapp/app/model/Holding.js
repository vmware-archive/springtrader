Ext.define('SpringTrader.model.Holding', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['purchasedate','purchaseprice', 'quantity', 'quote']
    },
    detail: function() {
        return {
            purchasedate: this.purchaseDate(),
            symbol: this.symbol(),
            quantity: this.quantity(),
            purchaseprice: this.purchasePrice(),
            currentprice: this.price(),
            purchasebasis: this.basisValue(),
            marketvalue: this.value(),
            netgain: this.netgain()
        }
    },
    purchaseDate: function() {
      return this.get('purchasedate');
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
    purchasePrice: function () {
        return this.get('purchaseprice');
    },
    basisValue: function() {
        return this.purchasePrice() * this.quantity();
    },
    netgain: function() {
        return this.value() - this.basisValue();
    }
});