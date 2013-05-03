describe('SpringTrader.controller.DailyTopGains', function () {
    var controller;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.DailyTopGains', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
    });

    it("refreshes when the event fires", function() {
        spyOn(controller, '_refresh');
        controller.launch();
        controller.getApplication().fireEvent('refresh', 'dailytopgains');
        expect(controller._refresh.mostRecentCall.args[0]).toEqual('dailytopgains');
    });
});