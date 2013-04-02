describe("MarketSummary", function() {
	it("exists", function() {
		var ms = Ext.create('SpringTrader.model.MarketSummary');
		expect(Ext.getClassName(ms)).toEqual('SpringTrader.model.MarketSummary');
	})
})