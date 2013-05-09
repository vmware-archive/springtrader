describe('SpringTrader.model.Holding', function() {
   var model, data;
    beforeEach(function() {
        model = Ext.create('SpringTrader.model.Holding');
        data = holdingListJSON.results[0]
    });

    it('exists', function() {
        expect(model.$className).toEqual('SpringTrader.model.Holding');
    });

    it('#symbol', function() {
        model.setData(data);
        expect(model.symbol()).toEqual(data.quote.symbol);
    });

    it('#price', function() {
        model.setData(data);
        expect(model.price()).toEqual(data.quote.price);
    });

    it('#value = price * qty', function() {
        model.setData(data);
        expect(model.value()).toEqual(data.quote.price * data.quantity);
    });

    it('#basisValue = purchase-price * qty', function() {
        model.setData(data);
        expect(model.basisValue()).toEqual(data.purchaseprice * data.quantity);
    });

    it('#netgain = value - basisValue', function() {
        model.setData(data);
        expect(model.netgain()).toEqual(model.value() - model.basisValue());
    });
});