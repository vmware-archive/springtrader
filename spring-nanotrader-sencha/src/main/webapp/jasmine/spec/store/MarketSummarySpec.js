describe('SpringTrader.store.MarketSummary', function () {
    var store, request;
    beforeEach(function() {
        store = Ext.create('SpringTrader.store.MarketSummary');
        request = mostRecentAjaxRequest();
    });
    it("calls out to the proper url", function () {
        expect(request.url).toEqual('/spring-nanotrader-services/api/marketSummary');
    });

    it("assigns the proper attributes from the data", function() {
        request.response({
            status: 200,
            responseText: marketSummaryJSON
        });

        expect(store.getCount()).toEqual(1);

        var marketSummaryData = store.getAt(0);
        expect(marketSummaryData.get('tradeStockIndexAverage')).toEqual(103.20);
        expect(marketSummaryData.get('tradeStockIndexVolume')).toEqual(22497.00);
        expect(marketSummaryData.get('change')).toEqual(-125.09);
        expect(marketSummaryData.get('topLosers').length).toEqual(3);
        expect(marketSummaryData.get('topGainers').length).toEqual(3);
    });
});
