describe('SpringTrader.controller.UserStats', function () {
    var controller;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.UserStats', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
    });

    it("refreshes when the event fires", function () {
        spyOn(controller, '_refresh');
        controller.launch();
        controller.getApplication().fireEvent('refresh', 'userstats');
        expect(controller._refresh.mostRecentCall.args[0]).toEqual('userstats');
    });
});
