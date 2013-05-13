Ext.define('SpringTrader.model.Holding', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'holdingid',
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
    },
    sell: function(successCallback, failureCallback) {
        var me = this;
        Ext.Ajax.request({
            url: '/spring-nanotrader-services/api/account/'+ SpringTrader.user.accountId() +'/order/asynch',
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'API_TOKEN': SpringTrader.user.get('authToken')},
            disableCaching: false,
            jsonData: {
                holdingid: this.getId(),
                ordertype: "sell"
            },
            disableCaching: false,
            success: function (response) {
                if(successCallback) {
                    successCallback(response);
                }
                me.destroy();
            },
            failure: function (response) {
                if(failureCallback) {
                    failureCallback(response);
                }
            }
        });
    }
});