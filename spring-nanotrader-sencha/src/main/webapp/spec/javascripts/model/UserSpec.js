describe('SpringTrader.model.User', function () {
    it('exists', function () {
        var user = Ext.create('SpringTrader.model.User');
        expect(user.$className).toEqual('SpringTrader.model.User');
    });

    it('has data', function () {
        var user = Ext.create('SpringTrader.model.User', userJSON);
        expect(user.get('fullname')).toEqual('test');
        expect(user.get('email')).toEqual('test@test.com');
        expect(user.get('passwd')).toEqual('testing');
        expect(user.get('userid')).toEqual('test1');
        expect(user.get('openbalance')).toEqual(1000000.00);
        expect(user.get('creditcard')).toEqual('1234123412341234');
        expect(user.get('address')).toEqual('san francisco');
    });

    it('receives form data', function() {
        var userForm = Ext.create('SpringTrader.model.User', userFormJSON);
        expect(userForm.get('accounts')).toEqual([{"openbalance": "1"}]);
        expect(userForm.get('creditcard')).toEqual('1234');
    });

    describe('validations', function() {
        it('requires all fields', function () {
            function eraseAttributes(model) { model.set('userid', null); model.set('creditcard', null); }
            var user = Ext.create('SpringTrader.model.User');
            // New models have 'userid' set automagically; setting it to null to make it invalid for test
            eraseAttributes(user);
            var errors = user.validate();

            expect(errors.isValid()).toBeFalsy();

            Ext.Array.each(user.getFields().keys, function(field)  {
                if (field == 'creditcard') { return; }
                if (user.fields.get(field).getPersist()) {
                    if (!errors.getByField(field)[0]) {
                        console.log(field + ' should be defined');
                    }
                    expect(errors.getByField(field)[0].getMessage()).toMatch('must be present$');
                }
            });
        });

        it('validates email field', function () {
            userJSON.email = 'invalidemail';
            var user = Ext.create('SpringTrader.model.User', userJSON);
            var errors = user.validate();

            expect(errors.getByField('email')[0].getMessage()).toEqual('is not a valid email address');
        });

        describe('Opening balance validation', function () {
            Ext.Array.each([10, "10", 10.0, "10.0"], function (value) {
                it('is valid with ' + value, function () {
                    userJSON.openbalance = value;
                    var user = Ext.create('SpringTrader.model.User', userJSON);
                    expect(user.isValid()).toBeTruthy();
                });
            });

            it('is invalid with non-numerics', function () {
                userJSON.openbalance = "invalid";
                var user = Ext.create('SpringTrader.model.User', userJSON);
                var errors = user.validate();
                expect(errors.getByField('openbalance')[0].getMessage()).toEqual('must be numeric');
            });
        });
    });

    describe('#save creates a new user on the backend', function() {
        it('posts to the back end', function() {
            jasmine.Ajax.useMock();
            clearAjaxRequests();
            var user = Ext.create('SpringTrader.model.User', userJSON);
            expect(mostRecentAjaxRequest()).toBeNull();
            user.save();
            request = mostRecentAjaxRequest();
            expect(request.url).toEqual('/spring-nanotrader-services/api/accountProfile');
            expect(request.method).toEqual('POST');
            expect(Ext.JSON.decode(request.params)).toEqual(userPostJSON);
        });
    });

    describe('#authenticated', function() {
        it('returns true when there is an auth token present', function() {
            var user = Ext.create('SpringTrader.model.User', {authToken: 'token'});
            expect(user.authenticated()).toBeTruthy();
        });
        it('return false when the auth token is blank', function() {
            var user = Ext.create('SpringTrader.model.User', {authToken: null});
            expect(user.authenticated()).toBeFalsy();
        });
        it('by default, a new user model is not authenticated', function() {
            var user = Ext.create('SpringTrader.model.User');
            expect(user.authenticated()).toBeFalsy();
        });
    });

    describe('.authenticate', function () {
        var model;
        beforeEach(function () {
            model = Ext.create('SpringTrader.model.User', userFormJSON);
            jasmine.Ajax.useMock();
            clearAjaxRequests();
        });

        it('POSTs to /api/login', function () {
            SpringTrader.model.User.authenticate(model);
            var request = mostRecentAjaxRequest();
            expect(request.url).toEqual('/spring-nanotrader-services/api/login');
            expect(request.method).toEqual('POST');
            expect(request.requestHeaders['Content-Type']).toEqual('application/json');
            expect(Ext.JSON.decode(request.params)).toEqual({username: userJSON.userid, password: userJSON.passwd});
        });

        it('on success updates user model with response data', function() {
            SpringTrader.model.User.authenticate(model);
            var request = mostRecentAjaxRequest();
            request.response({
                status: 201,
                responseText: Ext.JSON.encode(loginOkResponseJSON)
            });
            expect(model.get('authToken')).toEqual(loginOkResponseJSON.authToken);
            expect(model.get('profileid')).toEqual(loginOkResponseJSON.profileid);
            expect(model.get('accountid')).toEqual(loginOkResponseJSON.accountid);
            expect(model.authenticated()).toBeTruthy();
        });

        it('applies the success callback when provided', function() {
            var successCallback = jasmine.createSpy();
            var failureCallback = jasmine.createSpy();

            SpringTrader.model.User.authenticate(model, successCallback, failureCallback);

            var request = mostRecentAjaxRequest();
            request.response({
                status: 201,
                responseText: Ext.JSON.encode(loginOkResponseJSON)
            });

            expect(successCallback.mostRecentCall.args[0].status).toEqual(201);
            expect(failureCallback).not.toHaveBeenCalled();
        });

        it('applies the failure callback when provided', function() {
            var successCallback = jasmine.createSpy();
            var failureCallback = jasmine.createSpy();

            SpringTrader.model.User.authenticate(model, successCallback, failureCallback);

            var request = mostRecentAjaxRequest();
            request.response({ status: 401 });
            expect(successCallback).not.toHaveBeenCalled();
            expect(failureCallback.mostRecentCall.args[0].status).toEqual(401);
        });

    });

    describe("#logout", function() {
        var user;
        beforeEach(function() {
            jasmine.Ajax.useMock();
            clearAjaxRequests();
            user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
            expect(user.authenticated()).toBeTruthy();
        });

        it("Clears out local authentication data", function() {
            user.logout();

            var request = mostRecentAjaxRequest();
            request.response({status: 200});

            expect(user.authenticated()).toBeFalsy();
            expect(user.get('authToken')).toBeNull();
            expect(user.get('profileid')).toBeNull();
            expect(user.get('accountid')).toBeNull();
        });

        it("sends the logout request to backend", function() {
            expect(mostRecentAjaxRequest()).toBeNull();

            var authToken = user.get('authToken');
            user.logout();

            var request = mostRecentAjaxRequest();
            expect(request.url).toEqual('/spring-nanotrader-services/api/logout');
            expect(request.method).toEqual('GET');
            expect(request.requestHeaders['API_TOKEN']).toEqual(authToken);
        });

        it('calls the success callback', function() {
            var successCallback = jasmine.createSpy();

            user.logout(successCallback);

            var request = mostRecentAjaxRequest();
            request.response({status: 200});

            expect(successCallback).toHaveBeenCalled();
        })
    });

    describe("#loadAccountData loads user statistics", function() {
        var user;
        beforeEach(function() {
            jasmine.Ajax.useMock();
            clearAjaxRequests();
            user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
            expect(user.authenticated()).toBeTruthy();
        });

        it("it sends the request for user statistics", function() {
            user.loadAccountData();
            var request = mostRecentAjaxRequest();

            expect(request.url).toEqual('/spring-nanotrader-services/api/account/'+user.get('accountid'));
            expect(request.method).toEqual('GET');
            expect(request.requestHeaders['Content-Type']).toEqual('application/json');
            expect(request.requestHeaders['API_TOKEN']).toEqual(user.get('authToken'));
        });

        it("populates the user model with the response data", function() {
            user.loadAccountData();
            var request = mostRecentAjaxRequest();

            request.response({
                status: 200,
                responseText: Ext.JSON.encode(accountJSON)
            });

            expect(user.get('creationdate')).toEqual(accountJSON.creationdate);
            expect(user.get('lastlogin')).toEqual(accountJSON.lastlogin);
            expect(user.get('logincount')).toEqual(accountJSON.logincount);
            expect(user.get('balance')).toEqual(accountJSON.balance);
            expect(user.get('openbalance')).toEqual(accountJSON.openbalance);
        });

        it("fires the success callback, when provided", function() {
            var successCallback = jasmine.createSpy();
            user.loadAccountData(successCallback);
            var request = mostRecentAjaxRequest();

            request.response({
                status: 200,
                responseText: Ext.JSON.encode(accountJSON)
            });

            expect(successCallback.mostRecentCall.args[0].status).toEqual(200);
        })
    });

    describe("accountSummary", function() {
        it("has one", function() {
            var user = Ext.create('SpringTrader.model.User');
            expect(user.accountSummary.$className).toEqual('SpringTrader.model.AccountSummary');
        });
    });

    describe('holdingSummary', function() {
        it('has one', function() {
            var user = Ext.create('SpringTrader.model.User');
            expect(user.holdingSummary.$className).toEqual('SpringTrader.model.HoldingSummary');
        });
    })
});