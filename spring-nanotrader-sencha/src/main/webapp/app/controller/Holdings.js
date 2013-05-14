Ext.define('SpringTrader.controller.Holdings', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['PortfolioHoldings', 'HoldingDetail', 'HoldingDetailTable'],
        refs: {
            mainView: 'mainview',
            titleBar: 'titlebar',
            holdingsList: 'holdingslist',
            sellButton: 'holdingdetail #submitButton',
            confirmation: 'holdingdetail #confirmation'
        },
        control: {
            holdingsList: {
                disclose: 'onDisclose'
            },
            sellButton: {
                tap: 'onSell'
            }
        }
    },

    onDisclose: function (list, record, target, index, event) {
        this.holding = list.getStore().getAt(index);

        var detailView = Ext.create('SpringTrader.view.HoldingDetail');
        var detailTable = detailView.getComponent(0);

        detailView.setTitle(this.holding.symbol());
        detailTable.setData(this.holding.detail());

        this.getTitleBar().hide();
        this.getMainView().getNavigationBar().show();
        this.getMainView().push(detailView);
    },

    onSell: function(button, event) {
        event.stopEvent();
        var me = this;
        var mainView = this.getMainView();
        var sellButton = this.getSellButton();
        var confirmation = this.getConfirmation();
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: 'Sell Holding',
                    ui  : 'decline',
                    handler: function() {
                        actionSheet.hide();
                        me.holding.sell(function() {
                            sellButton.hide();
                            confirmation.show();
                        });
                    }
                },
                {
                    text: 'Cancel',
                    ui  : 'cancel',
                    handler: function() {
                        actionSheet.hide();
                    }
                }
            ]
        });
        Ext.Viewport.add(actionSheet);
        actionSheet.show();
    }
})