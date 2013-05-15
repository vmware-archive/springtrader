describe('SpringTrader.model.Holding', function() {
   var model, data;
    beforeEach(function() {
        model = Ext.create('SpringTrader.model.Holding');
        data = holdingListJSON.results[0]
        model.setData(data);
    });

    it('exists', function() {
        expect(model.$className).toEqual('SpringTrader.model.Holding');
    });

    it('#symbol', function() {
        expect(model.symbol()).toEqual(data.quote.symbol);
    });

    it('#price', function() {
        expect(model.price()).toEqual(data.quote.price);
    });

    it('#value = price * qty', function() {
        expect(model.value()).toEqual(data.quote.price * data.quantity);
    });

    it('#basisValue = purchase-price * qty', function() {
        expect(model.basisValue()).toEqual(data.purchaseprice * data.quantity);
    });

    it('#netgain = value - basisValue', function() {
        expect(model.netgain()).toEqual(model.value() - model.basisValue());
    });

    it("#purchaseDate", function() {
        expect(model.purchaseDate()).toEqual(data.purchasedate);
    });

    it("#purchasePrice", function() {
        expect(model.purchasePrice()).toEqual(data.purchaseprice);
    });

    it("#detail", function() {
        expect(model.detail()).toEqual({
                purchasedate: data.purchasedate,
                symbol: data.quote.symbol,
                quantity: data.quantity,
                purchaseprice: data.purchaseprice,
                currentprice: data.quote.price,
                purchasebasis: model.basisValue(),
                marketvalue: model.value(),
                netgain: model.netgain()
            }
        )
    });
});