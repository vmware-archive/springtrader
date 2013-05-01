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

    it('shows indices', function() {
        expect(Ext.DomQuery.selectNode('#ms-index', domEl).textContent).toEqual('103.20');
        expect(Ext.DomQuery.selectNode('#ms-volume', domEl).textContent).toEqual('22497');
        expect(Ext.DomQuery.selectNode('#ms-change', domEl).textContent).toEqual('-125.09 ↓');
    });

    it('shows days gainers symbols', function() {
        expect(Ext.DomQuery.select('.market-summary .gainers .symbols', domEl).map(function(el) {return el.textContent}).join(', ')).toEqual('ORLY, SIRI, FLIR');
    });

    it('shows days gainers changes', function() {
        expect(Ext.DomQuery.select('.market-summary .gainers .changes', domEl).map(function(el) {return el.textContent}).join(', ')).toEqual('56.29 ↑, 51.94 ↑, 45.82 ↑');
    });

    it('shows days losers symbols', function() {
        expect(Ext.DomQuery.select('.market-summary .losers .symbols', domEl).map(function(el) {return el.textContent}).join(', ')).toEqual('CTXS, MU, AAPL');
    });

    it('shows days losers changes', function() {
        expect(Ext.DomQuery.select('.market-summary .losers .changes', domEl).map(function(el) {return el.textContent}).join(', ')).toEqual('-49.11 ↓, -38.16 ↓, -36.61 ↓');
    });
});