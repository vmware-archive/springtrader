Ext.require('Ext.MessageBox');

describe('SpringTrader.controller.User', function () {
    var controller, model, view;
    beforeEach(function () {
        view = Ext.create('Ext.navigation.View');
        controller = Ext.create('SpringTrader.controller.User', { application: SpringTrader.app, views: [view] });
        model = Ext.create('SpringTrader.model.User', userFormJSON);
    });

    it('successful model save callback', function () {
        var operation = { wasSuccessful: function () { return true; } };
        var navView = controller.getNavView();
        spyOn(navView, 'pop');
        spyOn(controller, 'authenticate');

        controller.onSaveCallback(model, operation);

        expect(navView.pop).toHaveBeenCalled();
        expect(controller.authenticate).toHaveBeenCalledWith(model);
    });

    describe('authenticate', function() {
        xit('succeeds', function() {
            expect(SpringTrader.user).toBe(model);

        })
    })
});