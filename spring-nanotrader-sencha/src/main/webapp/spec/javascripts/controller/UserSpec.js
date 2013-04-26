Ext.require('Ext.MessageBox');

describe('SpringTrader.controller.User', function () {
    var controller, model, view;
    beforeEach(function () {
        view = Ext.create('Ext.navigation.View');
        controller = Ext.create('SpringTrader.controller.User', { application: SpringTrader.app, views: [view] });
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
/*
 * UserController#authenticate
 * -- ajax posts to back end
 * -- on success, updates SpringTrader.user with authToken, profileid, accountid
 * -- on failure, post an error alert with {details: ""}(?)
 */

/* User#authenticated returns authToken !== undefined */