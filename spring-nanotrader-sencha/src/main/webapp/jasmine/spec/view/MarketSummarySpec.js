Ext.require('SpringTrader.view.MarketSummary');

describe('SpringTrader.view.MarketSummary', function() {
    var marketSummaryView;

    var marketSummaryStore = Ext.create('SpringTrader.store.MarketSummary', {
        proxy: undefined,
        data: [
            {
                "tradeStockIndexAverage": 103.20,
                "tradeStockIndexVolume": 22497.00,
                "tradeStockIndexOpenAverage": 104.45,
                "change": -125.09,
                "percentGain": -1.00,
                "summaryDate": "2013-04-15",
                "topLosers": [
                    {
                        "quoteid": 24,
                        "low": 132.92,
                        "open1": 158.10,
                        "volume": 261.00,
                        "price": 108.99,
                        "high": 174.10,
                        "companyname": "Citrix Systems, Inc.",
                        "symbol": "CTXS",
                        "change1": -49.11,
                        "version": 0
                    },
                    {
                        "quoteid": 64,
                        "low": 148.13,
                        "open1": 158.15,
                        "volume": 202.00,
                        "price": 119.99,
                        "high": 159.15,
                        "companyname": "Micron Technology, Inc.",
                        "symbol": "MU",
                        "change1": -38.16,
                        "version": 0
                    },
                    {
                        "quoteid": 9,
                        "low": 96.11,
                        "open1": 130.65,
                        "volume": 369.00,
                        "price": 94.04,
                        "high": 122.65,
                        "companyname": "Apple Inc.",
                        "symbol": "AAPL",
                        "change1": -36.61,
                        "version": 0
                    }
                ],
                "topGainers": [
                    {
                        "quoteid": 72,
                        "low": 170.97,
                        "open1": 171.97,
                        "volume": 245.00,
                        "price": 228.26,
                        "high": 209.41,
                        "companyname": "O Reilly Automotive, Inc.",
                        "symbol": "ORLY",
                        "change1": 56.29,
                        "version": 0
                    },
                    {
                        "quoteid": 85,
                        "low": 176.30,
                        "open1": 189.30,
                        "volume": 262.00,
                        "price": 241.24,
                        "high": 223.37,
                        "companyname": "Sirius XM Radio Inc.",
                        "symbol": "SIRI",
                        "change1": 51.94,
                        "version": 0
                    },
                    {
                        "quoteid": 43,
                        "low": 166.35,
                        "open1": 169.35,
                        "volume": 132.00,
                        "price": 215.17,
                        "high": 182.35,
                        "companyname": "FLIR Systems, Inc.",
                        "symbol": "FLIR",
                        "change1": 45.82,
                        "version": 0
                    }
                ]
            }
            ]
    });

    beforeEach(function() {
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