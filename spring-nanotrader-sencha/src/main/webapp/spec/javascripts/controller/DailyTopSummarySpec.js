describe('SpringTrader.controller.DailyTopSummary', function () {
    var controller;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.DailyTopSummary', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
    });

    it("refreshes when the event fires", function() {
        spyOn(controller, '_refresh');
        controller.launch();
        controller.getApplication().fireEvent('refresh', 'dailytopsummary');
        expect(controller._refresh.mostRecentCall.args[0]).toEqual('dailytopsummary');
    });
});