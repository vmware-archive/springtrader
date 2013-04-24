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
        var navView = controller.getNavView();
        spyOn(navView, 'pop');
        spyOn(controller, 'authenticate');

        controller.onSaveCallback(model, operation);

        expect(navView.pop).toHaveBeenCalled();
        expect(controller.authenticate).toHaveBeenCalledWith(model);
    });

    describe('authenticate', function () {
        beforeEach(function () {
            jasmine.Ajax.useMock();
            clearAjaxRequests();
            controller.authenticate(model);
        });
        it('assigns model to SpringTrader.user', function () {
            expect(SpringTrader.user).toBe(model);
        });
        it('POSTs to /api/login', function () {
            var request = mostRecentAjaxRequest();
            expect(request.url).toEqual('/spring-nanotrader-services/api/login');
            expect(request.method).toEqual('POST');
            expect(request.params).toEqual(['username=', userJSON.userid, '&', 'password=', userJSON.passwd].join(''));
        });
        it('on success updates SpringTrader.user with response data');
        it('on failure shows the error alert');
    })
});
/*
 * UserController#authenticate
 * -- ajax posts to back end
 * -- on success, updates SpringTrader.user with authToken, profileid, accountid
 * -- on failure, post an error alert with {details: ""}(?)
 */

/* User#authenticated returns authToken !== undefined */