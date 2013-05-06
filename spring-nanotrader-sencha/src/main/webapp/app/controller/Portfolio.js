Ext.define('SpringTrader.controller.Portfolio', {
   extend: 'Ext.app.Controller',
    config: {
        views: ['PortfolioSummary', 'PortfolioSummaryTable', 'PortfolioHoldings', 'Portfolio'],
        refs: {
            portfolioSwitch: 'portfolioPage #portfolioswitch',
            portfolioSummary: 'portfoliosummary',
            portfolioSummaryTable: 'portfoliosummarytable',
            portfolioHoldings: 'portfolioholdings'
        },
        control: {
            portfolioSwitch: {
                toggle: 'onToggle'
            }
        }
    },
    launch: function() {
        this.getApplication().on('refresh', this._refresh, this);
    },
    _refresh: function(what) {
        if (what == 'accountsummary') {
            this.getPortfolioSummaryTable().updateView(SpringTrader.user.accountSummary);
        }
    },
    onInitialize: function() {
        var me = this;
        SpringTrader.user.accountSummary.refreshData(function () {
            me.getApplication().fireEvent('refresh', 'accountsummary');
        });
    },
    onToggle: function(segmentedButton, button, isPressed) {
        function showHide(view, isPressed) {
            if (view === undefined) { return; }
            if (isPressed) {
                view.show();
            } else {
                view.hide();
            }
        }

        var views = {
            summary: this.getPortfolioSummary(),
            holdings: this.getPortfolioHoldings()
        }

        showHide(views[button.getData().ref], isPressed);
    }
});