describe('SpringTrader.LocalStore', function () {
    it("exists", function () {
        expect(Ext.create('SpringTrader.LocalStore').$className).toEqual('SpringTrader.LocalStore');
    });

    it("uses window.localStorage by default", function () {
        expect(Ext.create('SpringTrader.LocalStore').store).toBe(window.localStorage);
    });

    xdescribe("when localStorage is not available", function () {
        var oldLocalStorage;
        beforeEach(function () {
            oldLocalStorage = window.localStorage;
            Object.defineProperty(window, 'localStorage', {value: null});
        });
        it("falls back to in-memory", function () {
            expect(Ext.create('SpringTrader.LocalStore').store).toEqual({});
        });
        afterEach(function () {
            Object.defineProperty(window, 'localStorage', oldLocalStorage);
        });
    });

    var store;
    Ext.Array.each([
        {label: "using an in-memory store", example: {}},
        {label: "using window.localStorage", example: window.localStorage}
    ],
        function (condition) {
            describe(condition.label, function () {
                beforeEach(function () {
                    store = Ext.create('SpringTrader.LocalStore', {store: condition.example})
                });

                describe("#add", function () {
                    it("a key-value pair", function () {
                        store.add('myKey', 'myValue');
                    });
                    it("returns self for chaining", function () {
                        expect(store.add('myKey', 'myValue')).toBe(store);
                    });
                    it("keys are unique", function() {
                        expect(store.add('myKey','1').add('myKey', '2').find('myKey')).toEqual('2');
                    });
                });

                describe("#find", function () {
                    it("finds by key", function () {
                        store.add('myKey', 'myValue');
                        expect(store.find('myKey')).toEqual('myValue');
                    });
                    it("returns undef for an unknown key", function() {
                        expect(store.find(new Date().getTime())).toBeUndefined();
                    });
                });

                describe("#remove", function() {
                    beforeEach(function() {
                        store.add('myKey', 'myValue');
                    });
                    it("removes the key", function () {
                        store.remove('myKey');
                        expect(store.find('myKey')).toBeUndefined();
                    });
                    it("returns the removed object", function () {
                        expect(store.remove('myKey')).toEqual('myValue');
                    });
                    it("return undef for an unknown key", function() {
                        expect(store.remove(new Date().getTime())).toBeUndefined();
                    })
                });
            });
        });

});