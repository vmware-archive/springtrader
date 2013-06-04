Ext.define('SpringTrader.controller.Transactions', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['TransactionDetail', 'Transactions'],
        refs: {
            transactionsPage: 'transactionsPage',
            transactionDetail: 'transactiondetail',
            mainView: 'mainview',
            titleBar: 'titlebar'
        },
        control: {
            transactionsPage: {
                activate: 'onTransactionsActive',
                disclose: 'onDisclose'
            }
        }
    },
    
    onTransactionsActive: function () {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });

        var store = Ext.StoreManager.lookup('orders');
        store.currentPage = 0;
        store.load(function () {
            Ext.Viewport.unmask();
        });
    },
    
    onDisclose: function(list, record, target, index, event) {
        var transaction = list.getStore().getAt(index), 
			detailView = Ext.create('SpringTrader.view.TransactionDetail'),
			mainView = this.getMainView();
        detailView.pushedFromMain = true;

        detailView.setData(transaction.detail());

        this.getTitleBar().hide();
        mainView.getNavigationBar().show();
        mainView.push(detailView);
    }
});