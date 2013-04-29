describe('SpringTrader.controller.UserStats', function () {
    var controller;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.UserStats', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
    });

    it ("refreshes the view when an event fires", function () {
        spyOn(controller, 'refreshUserStats');
        controller.launch();
        controller.getApplication().fireEvent('refresh', 'userstats');
        expect(controller.refreshUserStats.mostRecentCall.args[0]).toEqual('userstats');
    });
});
