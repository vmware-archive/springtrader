describe('SpringTrader.store.MarketSummary', function () {
    it("calls out to the proper url", function () {
        jasmine.Ajax.assertInstalled();
        var store = Ext.create('SpringTrader.store.MarketSummary');
        var request = mostRecentAjaxRequest();
        expect(request.url).toEqual('/spring-nanotrader-services/api/marketSummary');
    });
});
