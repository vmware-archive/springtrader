describe('SpringTrader.store.HoldingList', function () {
    var store, request, user;
    beforeEach(function() {
        SpringTrader.user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
        jasmine.Ajax.useMock();
        clearAjaxRequests();
        store = Ext.create('SpringTrader.store.HoldingList');

        store.load();

        request = mostRecentAjaxRequest();
    });

    it("calls out to the proper url", function () {
        expect(request.url).toEqual('/spring-nanotrader-services/api/account/' + loginOkResponseJSON.accountid + '/holdings?page=0&pageSize=5');
        expect(request.method).toEqual('GET');
        expect(request.requestHeaders['Content-Type']).toEqual('application/json');
        expect(request.requestHeaders['API_TOKEN']).toEqual(loginOkResponseJSON.authToken);
    });

    it("assigns the proper attributes from the data", function() {
        request.response({
            status: 200,
            responseText: holdingListJSON
        });

        expect(store.getCount()).toEqual(5);

        var holdingData = store.getAt(0);
        expect(holdingData.symbol()).toEqual('MSFT');
        expect(holdingData.price()).toEqual(104.19);
        expect(holdingData.value()).toEqual(104.19 * 113);
        expect(holdingData.netgain()).toEqual((104.19 * 113) - (78.79 * 113));
    });

    it("does not make an ajax call if the user is not logged in, yet");
});
