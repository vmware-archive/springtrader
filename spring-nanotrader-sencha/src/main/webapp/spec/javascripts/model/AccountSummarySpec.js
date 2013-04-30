describe('SpringTrader.model.AccountSummary', function () {
    var user, model;
    beforeEach(function () {
        user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
        user.updateAccountData(accountJSON);
        model = user.accountSummary;
    });

    describe('#currentBalance', function () {

    });

    describe('#openBalance', function () {
        it("is the user model's opening balance", function () {
            user.set('openbalance', 1);
            expect(model.openBalance()).toBe(user.get('openbalance'));
        });
    });

    describe('#refreshData', function () {
        beforeEach(function() {
            jasmine.Ajax.useMock();
            clearAjaxRequests();
        })
        it("hits the api", function () {
            model.refreshData();
            var request = mostRecentAjaxRequest();

            expect(request.url).toEqual('/spring-nanotrader-services/api/account/'+ user.get('accountid') +'/portfolioSummary');
            expect(request.method).toEqual('GET');
            expect(request.requestHeaders['Content-Type']).toEqual('application/json');
            expect(request.requestHeaders['API_TOKEN']).toEqual(user.get('authToken'));
        });

        it("updates the fields portfolio summary", function () {
            model.refreshData();
            var request = mostRecentAjaxRequest();

            request.response({
                status: 200,
                responseText: Ext.JSON.encode(portfolioSummaryJSON)
            });
            expect(model.netGain()).toEqual(portfolioSummaryJSON.gain);
            expect(model.totalHoldings()).toEqual(portfolioSummaryJSON.totalMarketValue);
            expect(model.currentBalance()).toEqual(portfolioSummaryJSON.totalMarketValue + accountJSON.balance);
            expect(model.balance()).toEqual(accountJSON.balance);
        });

    });
});