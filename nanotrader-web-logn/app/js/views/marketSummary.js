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
     * Sets the model into the object
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of a nano.models Class
     * @return void
     */
    setModel : function(model) {
        this.model = model;
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
     * @param Object model: Instance of nano.models.MarketSummary
     * @return void
     */
    render: function(model) {
        if (model)
        {
            this.model = model;
        }
        var marketSummaryTpl = this.template(this.model.toJSON());
        this.$el.html(marketSummaryTpl);
    }
});