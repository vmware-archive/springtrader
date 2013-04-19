describe('SpringTrader.model.User', function () {
    var userJSON;
    beforeEach(function () {
        userJSON = {"fullname": "test", "email": "test@test.com", "passwd": "testing", "userid": "test1", "accounts": [
            {"openbalance": "1000000"}
        ], "creditcard": "1234123412341234", "address": "san francisco"};
    });

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
        expect(user.get('accounts')).toEqual([
            {"openbalance": "1000000"}
        ]);
        expect(user.get('creditcard')).toEqual('1234123412341234');
        expect(user.get('address')).toEqual('san francisco');
    });

    it('requires all fields', function () {
        var user = Ext.create('SpringTrader.model.User');
        var errors = user.validate();

        expect(errors.isValid()).toBeFalsy();

        for (var field in userJSON) {
            expect(errors.getByField(field)[0].getMessage()).toEqual('must be present');
        }
        ;
    });

    it('validates email field', function () {
        userJSON.email = 'invalidemail';
        var user = Ext.create('SpringTrader.model.User', userJSON);
        var errors = user.validate();

        expect(errors.getByField('email')[0].getMessage()).toEqual('is not a valid email address');
    });

    describe('Account balance validation', function () {
        Ext.Array.each([10, "10", 10.0, "10.0"], function (value) {
            it('is valid with ' + value, function () {
                userJSON.accounts = [
                    {"openbalance": value}
                ];
                var user = Ext.create('SpringTrader.model.User', userJSON);
                expect(user.isValid()).toBeTruthy();
            });
        });

        it('is invalid with non-numerics', function () {
            userJSON.accounts = [
                {"openbalance": "invalid"}
            ];
            var user = Ext.create('SpringTrader.model.User', userJSON);
            var errors = user.validate();
            expect(errors.getByField('accounts')[0].getMessage()).toEqual('opening balance must be numeric');
        });
    });
});