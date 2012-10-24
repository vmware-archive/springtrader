/**
 * View Class for the Market Summary
 * @author Carlos Soto <carlos.soto>
 */
nano.views.MarketSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.marketSummary = this.$el;
    },

    /**
     * Renders the Market Summary View
     * @author Carlos Soto <carlos.soto>
     * @param Object model: Instance of nano.models.MarketSummary
     * @return void
     */
    render: function (model) {
        'use strict';
        var i;
        this.$el.html(_.template( nano.utils.getTemplate(nano.conf.tpls.marketSummary) )(model.toJSON()));

        //Cache the jQuery objects of the MS view
        this.elements = {
            index : this.$('#ms-index'),
            volume : this.$('#ms-volume'),
            change : this.$('#ms-change'),
            changeArrow : this.$('#ms-change-arrow'),
            topGainers : [],
            topLosers : []
        };

        for (i in model.get('topGainers')) {
            this.elements.topGainers[i] = {
                symbol : this.$('#ms-tg-sym-' + i),
                price : this.$('#ms-tg-price-' + i),
                change : this.$('#ms-tg-change-' + i)
            };
        }
        for (i in model.get('topLosers')) {
            this.elements.topLosers[i] = {
                symbol : this.$('#ms-tl-sym-' + i),
                price : this.$('#ms-tl-price-' + i),
                change : this.$('#ms-tl-change-' + i)
            };
        }
        this.update(model);
    },

    /**
     * Updates the Market Summary View with a new model
     * @author Carlos Soto <carlos.soto>
     * @param Object model: Instance of nano.models.MarketSummary
     * @return void
     */
    update: function (model) {
        'use strict';
        var i,
            topGainers = model.get('topGainers'),
            topLosers = model.get('topLosers');
        this.elements.index.html( round(model.get('tradeStockIndexAverage')) );
        this.elements.volume.html( round(model.get('tradeStockIndexVolume')) );
        if ( model.get('percentGain') > 0 ) {
            this.elements.change.html( '+' + nano.utils.round(model.get('percentGain')) );
            this.elements.change.removeClass('red-color');
            this.elements.change.addClass('green-color');
            this.elements.changeArrow.html('&uarr;');
            this.elements.changeArrow.removeClass('red-color');
            this.elements.changeArrow.addClass('green-color');
        } else if ( model.get('percentGain') < 0 ) {
            this.elements.change.html( round(model.get('percentGain')) );
            this.elements.change.removeClass('green-color');
            this.elements.change.addClass('red-color');
            this.elements.changeArrow.html('&darr;');
            this.elements.changeArrow.removeClass('green-color');
            this.elements.changeArrow.addClass('red-color');
        } else {
            this.elements.change.html( round(model.get('percentGain')) );
            this.elements.change.attr('class', '');
            this.elements.changeArrow.html('');
            this.elements.changeArrow.attr('class', '');
        }
        for (i in topGainers) {
                this.elements.topGainers[i].symbol.html( topGainers[i].symbol );
                this.elements.topGainers[i].symbol.attr('title', topGainers[i].companyname );
                this.elements.topGainers[i].price.html( topGainers[i].price.toFixed(2) );
                this.elements.topGainers[i].change.html( topGainers[i].change1 );
        }
        for (i in topGainers ) {
                this.elements.topLosers[i].symbol.html( topLosers[i].symbol );
                this.elements.topLosers[i].symbol.attr('title', topLosers[i].companyname );
                this.elements.topLosers[i].price.html( topLosers[i].price.toFixed(2) );
                this.elements.topLosers[i].change.html( topLosers[i].change1 );
        }
    }
});
