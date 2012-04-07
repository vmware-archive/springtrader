/**
 * View Class for the Market Summary
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.MarketSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.MarketSummary instance
     * @return void
     */
    initialize : function(options) {
        nano.containers.marketSummary = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.marketSummary)),

    /**
     * Renders the Market Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    render: function() {
        var marketSummaryTpl = this.template(this.model.toJSON());
        this.$el.html(marketSummaryTpl);
    }
});