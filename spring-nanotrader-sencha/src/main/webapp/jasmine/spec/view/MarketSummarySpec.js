Ext.require('SpringTrader.view.MarketSummary');

describe('SpringTrader.view.MarketSummary', function() {
    var marketSummaryView, marketSummaryStore;

    beforeEach(function() {
        marketSummaryStore = Ext.create('SpringTrader.store.MarketSummary', {
            proxy: undefined,
            data: [ marketSummaryJSON ]
        });

        marketSummaryView = Ext.create('SpringTrader.view.MarketSummary', {
            store: marketSummaryStore,
            renderTo: 'jasmine_content'
        });
    });

    it("shows indices", function() {
        expect(domEl.find("#ms-index").text()).toEqual("103.20");
        expect(domEl.find("#ms-volume").text()).toEqual("22497.00");
        expect(domEl.find("#ms-change").text()).toEqual("-125.09");
    });

    it("shows days gainers symbols", function() {
        expect(domEl.find(".market-summary .gainers .symbols").text()).toEqual('ORLYSIRIFLIR'); // ORLY, SIRI, FLIR
    });

    it("shows days gainers prices", function() {
        expect(domEl.find(".market-summary .gainers .prices").text()).toEqual('228.26241.24215.17'); // 228.26, 241.24, 215.17
    });

    it("shows days gainers changes", function() {
        expect(domEl.find(".market-summary .gainers .changes").text()).toEqual('56.2951.9445.82'); // 56.29, 51.94, 45.82
    });

    it("shows days losers symbols", function() {
        expect(domEl.find(".market-summary .losers .symbols").text()).toEqual('CTXSMUAAPL'); // CTXS, MU & AAPL
    });

    it("shows days losers prices", function() {
        expect(domEl.find(".market-summary .losers .prices").text()).toEqual('108.99119.9994.04'); // 108.99, 119.99, 94.04
    });

    it("shows days losers changes", function() {
        expect(domEl.find(".market-summary .losers .changes").text()).toEqual('-49.11-38.16-36.61'); // -49.11, -38.16, -36.61
    });
});