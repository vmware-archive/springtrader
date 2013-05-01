describe('SpringTrader.model.HoldingSummary', function() {
    var user, model;
    beforeEach(function() {
        user = Ext.create('SpringTrader.model.User', loginOkResponseJSON);
        model = user.holdingSummary;
    });

    describe('#refreshData', function() {
        beforeEach(function() {
            jasmine.Ajax.useMock();
            clearAjaxRequests();
        });
        it('hits the api', function() {
            model.refreshData();
            var request = mostRecentAjaxRequest();

            expect(request.url).toEqual('/spring-nanotrader-services/api/account/' + user.get('accountid') + '/holdingSummary');
            expect(request.method).toEqual('GET');
            expect(request.requestHeaders['Content-Type']).toEqual('application/json');
            expect(request.requestHeaders['API_TOKEN']).toEqual(user.get('authToken'));
        });

        it('updates the holding summary attributes', function() {
            model.refreshData();
            var request = mostRecentAjaxRequest();

            request.response({
                status: 200,
                responseText: Ext.JSON.encode(holdingSummaryJSON)
            });

            expect(model.holdingRollups()).toEqual(holdingSummaryJSON.holdingRollups);
        });
    });
});