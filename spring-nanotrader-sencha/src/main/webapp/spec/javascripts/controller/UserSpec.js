Ext.require('Ext.MessageBox');

describe('SpringTrader.controller.User', function () {
    var controller, model;
    beforeEach(function () {
        controller = Ext.create('SpringTrader.controller.User', { application: SpringTrader.app });
        model = Ext.create('SpringTrader.model.User', userFormJSON);
    });

    it('successful model save callback', function () {
        var operation = { wasSuccessful: function () {
            return true;
        } };
        spyOn(SpringTrader.model.User, 'authenticate');

        controller.onSaveCallback(model, operation);

        expect(SpringTrader.model.User.authenticate).toHaveBeenCalled();
        expect(SpringTrader.model.User.authenticate.mostRecentCall.args[0]).toEqual(model);
    });
});