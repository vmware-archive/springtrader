describe('SpringTrader.controller.DailyTopSummary', function () {
    var controller;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.DailyTopSummary', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
    });

    it("refreshes when the event fires", function() {
        spyOn(controller, 'refreshDailyTopSummary');
        controller.launch();
        controller.getApplication().fireEvent('refresh', 'dailytopsummary');
        expect(controller.refreshDailyTopSummary.mostRecentCall.args[0]).toEqual('dailytopsummary');
    });
});