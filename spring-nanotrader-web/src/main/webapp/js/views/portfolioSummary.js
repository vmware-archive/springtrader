/**
 * View Class for the Portfolio Summary
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.PortfolioSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.PortfolioSummary instance
     * @return void
     */
    initialize : function(options) {
        nano.containers.portfolioSummary = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.portfolioSummary)),

    /**
     * Renders the Portfolio Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of nano.models.PortfolioSummary
     * @return void
     */
    render: function(model) {
        if (model)
        {
            this.model = model;
        }
        var portfolioSummary = this.template(this.model.toJSON());
        this.$el.html(portfolioSummary);
        this.$el.show();

        //Prepare the view for collapsing sections
        if ( nano.utils.isMobile() )
        {
            nano.utils.setCollapsable(this);
        }
    }
});