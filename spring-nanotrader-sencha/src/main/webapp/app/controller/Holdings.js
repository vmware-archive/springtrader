Ext.define('SpringTrader.controller.Holdings', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['PortfolioHoldings', 'HoldingDetail'],
        refs: {
            mainView: 'mainview',
            titleBar: 'titlebar',
            holdingsList: 'holdingslist'
        },
        control: {
            holdingsList: {
                disclose: 'onDisclose'
            }
        }
    },

    onDisclose: function (list, record, target, index, event) {
        var holding = list.getStore().getAt(index);

        var detailView = Ext.create('SpringTrader.view.HoldingDetail');
        detailView.setTitle(holding.symbol());
        detailView.setData(holding.detail());

        this.getTitleBar().hide();
        this.getMainView().getNavigationBar().show();
        this.getMainView().push(detailView);
    }
})