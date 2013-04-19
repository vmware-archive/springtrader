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
        expect(user.get('accounts')).toEqual([
            {"openbalance": "1000000"}
        ]);
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
            function eraseUserid(model) { model.set('userid', null) }
            var user = Ext.create('SpringTrader.model.User');
            // New models have 'userid' set automagically; setting it to null to make it invalid for test
            eraseUserid(user);
            var errors = user.validate();

            expect(errors.isValid()).toBeFalsy();

            Ext.Array.each(user.getFields().keys, function(field)  {
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

    describe('backend proxy', function() {
        it('posts to the back end', function() {
            var user = Ext.create('SpringTrader.model.User', userJSON);
            expect(mostRecentAjaxRequest()).toBeNull();
            user.save();
            request = mostRecentAjaxRequest();
            expect(request.url).toEqual('/spring-nanotrader-services/api/accountProfile');
            expect(request.method).toEqual('POST');
            expect(request.params).toEqual(Ext.JSON.encode(userJSON));
        })
    })
});