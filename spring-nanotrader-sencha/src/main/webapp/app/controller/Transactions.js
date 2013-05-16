Ext.define('SpringTrader.controller.Transactions', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['TransactionDetail', 'Transactions'],
        refs: {
            transactions: 'transactionsPage',
            transactionDetail: 'transactiondetail',
            mainView: 'mainview',
            titleBar: 'titlebar'
        },
        control: {
            transactions: {
                disclose: 'onDisclose'
            }
        }
    },
    onDisclose: function(list, record, target, index, event) {
        var transaction = list.getStore().getAt(index);

        var detailView = Ext.create('SpringTrader.view.TransactionDetail');
        detailView.pushedFromMain = true;

        detailView.setData(transaction.detail());

        this.getTitleBar().hide();
        this.getMainView().getNavigationBar().show();
        this.getMainView().push(detailView);
    }
});