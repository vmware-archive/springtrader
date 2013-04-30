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
                currentbalance: 'cb',
                openbalance: 'ob',
                cashbalance: '$b',
                totalholdings: 'th',
                netgain: 'ng'
            }
        });
    });

    it("renders the view", function() {
        expect(Ext.DomQuery.select('td').map(function(el){return el.textContent}).join(', ')).toEqual('$cb, $ob, $$b, $th, $ng');
    });

    it("#updateView updates the view", function() {
        model.set('gain', 2);
        model.set('totalMarketValue', 3);

        view.updateView(model);

        expect(Ext.DomQuery.select('td').map(function(el){return el.textContent}).join(', ')).toEqual('$4, $1, $1, $3, $2');
    });
});