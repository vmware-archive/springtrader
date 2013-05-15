describe('SpringTrader.model.Order', function() {
   var model, data;
    beforeEach(function() {
        model = Ext.create('SpringTrader.model.Order');
        data = ordersJSON.results[0];
        model.setData(data);
    });

    it('exists', function() {
        expect(model.$className).toEqual('SpringTrader.model.Order');
    });

    it('#symbol', function() {
        expect(model.symbol()).toEqual(data.quote.symbol);
    });

    it('#quantity', function() {
        expect(model.quantity()).toEqual(data.quantity);
    });

    it('#type', function() {
        expect(model.type()).toEqual(data.ordertype);
    });

    it('#status', function() {
       expect(model.status()).toEqual(data.orderstatus);
    });

});