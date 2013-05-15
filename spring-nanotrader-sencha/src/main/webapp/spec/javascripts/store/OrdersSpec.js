describe('SpringTrader.store.Orders', function () {
    var store, request, user;
    beforeEach(function() {
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
        jasmine.Ajax.useMock();
        clearAjaxRequests();
        store = Ext.create('SpringTrader.store.Orders');

        store.load();

        request = mostRecentAjaxRequest();
    });

    it("calls out to the proper url", function () {
        expect(request.url).toEqual('/spring-nanotrader-services/api/account/' + loginOkResponseJSON.accountid + '/orders?page=0&pageSize=5');
        expect(request.method).toEqual('GET');
        expect(request.requestHeaders['Content-Type']).toEqual('application/json');
        expect(request.requestHeaders['API_TOKEN']).toEqual(loginOkResponseJSON.authToken);
    });

    it("assigns the proper attributes from the data", function() {
        request.response({
            status: 200,
            responseText: ordersJSON
        });

        expect(store.getTotalCount()).toEqual(45);

        var orderData = store.getAt(0);
        expect(orderData.symbol()).toEqual('NTAP');
        expect(orderData.type()).toEqual("sell");
        expect(orderData.quantity()).toEqual(126.00);
        expect(orderData.status()).toEqual('completed');
    });
});
