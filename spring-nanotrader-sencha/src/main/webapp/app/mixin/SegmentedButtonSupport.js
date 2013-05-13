Ext.define('SpringTrader.mixin.SegmentedButtonSupport', {
    extend: 'Ext.mixin.Mixin',
    mixinConfig: {
        id: 'segmentedbuttonsupport'
    },
    showHide: function (ref, isPressed, views) {
        var view = views[ref];

        if (view === undefined) {
            return;
        }
        if (isPressed) {
            view.show();
        } else {
            view.hide();
        }
    },

    refreshStore: function (ref, isPressed, stores) {
        var storeid = stores[ref];
        if (storeid && isPressed) {
            var store = Ext.StoreManager.lookup(storeid)
            store.currentPage = 0;
            store.load();
        }
    }

})