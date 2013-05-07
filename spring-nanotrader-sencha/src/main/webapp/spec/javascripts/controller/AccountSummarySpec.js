describe('SpringTrader.controller.AccountSummary', function () {
    var controller;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.AccountSummary', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
    });

    it("exists", function() {
       expect(controller.$className).toEqual('SpringTrader.controller.AccountSummary');
    });

    it("refreshes when the event fires", function() {
        spyOn(controller, '_refresh');
        controller.launch();
        controller.getApplication().fireEvent('refresh', 'accountsummary');
        expect(controller._refresh.mostRecentCall.args[0]).toEqual('accountsummary');
    });
});