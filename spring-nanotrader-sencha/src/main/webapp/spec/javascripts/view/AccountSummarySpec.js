describe('SpringTrader.view.AccountSummary', function() {
    var model, view;
    beforeEach(function() {
        model = Ext.create('SpringTrader.model.User', {
            openbalance: 1,
            balance: 1
        }).accountSummary;
        view = Ext.create('SpringTrader.view.AccountSummary', {
            renderTo: 'jasmine_content',
            data: {
                currentbalance: 6,
                openbalance: 2,
                cashbalance: 1,
                totalholdings: 3,
                netgain: 4
            }
        });
    });

    it("renders the view", function() {
        expect(Ext.DomQuery.select('td').map(function(el){return el.textContent}).join(', ')).toEqual('$6.00, $2.00, $1.00, $3.00, $4.00');
    });

    it("#updateView updates the view", function() {
        model.set('gain', 2);
        model.set('totalMarketValue', 3);

        view.updateView(model);

        expect(Ext.DomQuery.select('td').map(function(el){return el.textContent}).join(', ')).toEqual('$4.00, $1.00, $1.00, $3.00, $2.00');
    });
});