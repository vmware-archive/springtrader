Ext.define('SpringTrader.controller.Portfolio', {
    extend: 'Ext.app.Controller',
    mixins: ['SpringTrader.mixin.SegmentedButtonSupport'],
    config: {
        views: ['Portfolio', 'PortfolioSummary', 'PortfolioSummaryTable', 'PortfolioHoldings'],
        refs: {
            portfolioPage: 'portfolioPage',
            portfolioSwitch: 'portfolioPage #portfolioswitch',
            portfolioSummary: 'portfoliosummary',
            portfolioSummaryTable: 'portfoliosummarytable',
            portfolioHoldings: 'portfolioPage portfolioholdings'
        },
        control: {
            portfolioPage: {
                activate: 'onPortfolioActive'
            },
            portfolioSwitch: {
                toggle: 'onToggle'
            }
        }
    },

    launch: function () {
        this.getApplication().on('refresh', this._refresh, this);
    },

    _refresh: function (what) {
        if (what == 'accountsummary') {
            this.getPortfolioSummaryTable().updateView(SpringTrader.user.accountSummary);
        }
    },
    
    onPortfolioActive: function () {
        var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
    },

    onToggle: function (segmentedButton, button, isPressed) {
           var views = {
               summary: this.getPortfolioSummary(),
               holdings: this.getPortfolioHoldings()
           }, stores = {
               summary: null,
               holdings: 'holdinglist'
           };

        this.showHide(button.getData().ref, isPressed, views);
        this.refreshStore(button.getData().ref, isPressed, stores);
    }
});
