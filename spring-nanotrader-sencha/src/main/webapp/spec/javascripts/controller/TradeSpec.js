describe('SpringTrader.controller.Trade', function() {
    var controller, field, event;
    beforeEach(function () {
        field = {getValue: function() { return 'VMW'; }};
        event = {stopEvent: jasmine.createSpy()};
        controller = Ext.create('SpringTrader.controller.Trade', { application: SpringTrader.app });
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
        jasmine.Ajax.useMock();
        clearAjaxRequests();
        controller.launch();
    });

    describe("Quote searches", function() {
        it("does nothing with an empty field", function() {
            field = {getValue: function() { return ''; }};
            controller.onSearch(field, event);
            var request = mostRecentAjaxRequest();

            expect(request).toBeNull();
        });

        it("calls the back-end to search for quotes", function() {
            controller.onSearch(field, event);
            var request = mostRecentAjaxRequest();

            expect(request.url).toEqual('/spring-nanotrader-services/api/quote/VMW');
            expect(request.method).toEqual('GET');
            expect(request.requestHeaders['Content-Type']).toEqual('application/json');
            expect(request.requestHeaders['API_TOKEN']).toEqual(loginOkResponseJSON.authToken);
        });

        xit("displays quote data & buy form when search is successful", function() {
            controller.onSearch(field, event);
            var request = mostRecentAjaxRequest();
            request.response({
                status: 200,
                responseText: Ext.JSON.encode(quoteJSON)
            });

            expect(controller.getQuoteTable().hidden()).toBeFalsy();
            expect(controller.getBuyForm().hidden()).toBeFalsy();
            expect(controller.getQuoteTable().getData()).toEqual(quoteJSON);
        });

        xit("hides quote data & buy form when search fails");

        xit("shows an alert when search fails", function() {
            field = {getValue: function() { return 'XYZ'; }};
            spyOn(Ext.Msg, 'alert');
            controller.onSearch(field, event);
            var request = mostRecentAjaxRequest();

            request.response({ status: 404 });

            expect(Ext.Msg.alert).toHaveBeenCalledWith('Not Found', 'No stock symbol "XYZ"');
        });
    })

    describe("Buy orders", function() {
        it("calls the back-end to place an order", function() {
            controller.newOrder = function() {
                var buyForm = {hide: jasmine.createSpy()};
                buyForm.reset = function() { return buyForm; }

                return {
                    accountid: SpringTrader.user.accountId(),
                    buyForm: buyForm,
                    searchForm: {reset: jasmine.createSpy()},
                    quoteTable: {hide: jasmine.createSpy()},
                    symbol: 'VMW',
                    quantity: 1000
                }
            }

            var button = {}, event = {stopEvent: jasmine.createSpy()};
            controller.onBuy(button, event);
            var request = mostRecentAjaxRequest();

            expect(request.url).toEqual('/spring-nanotrader-services/api/account/'+ loginOkResponseJSON.accountid +'/order/asynch');
            expect(request.method).toEqual('POST');
            expect(request.requestHeaders['Content-Type']).toEqual('application/json');
            expect(request.requestHeaders['API_TOKEN']).toEqual(loginOkResponseJSON.authToken);

        });
    });

});