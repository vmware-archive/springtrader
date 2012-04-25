/**
 * View Class for the User Statistics
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.UserStatistics = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.Account instance
     * @return void
     */
    initialize : function(options) {
        nano.containers.userStatistics = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.userStatistics)),

    /**
     * Renders the Portfolio View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of nano.models.UserStatistics
     * @return void
     */
     render : function(model) {
        if (model)
        {
            this.model = model;
        }
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.show();

        //Prepare the view for collapsing sections
        if ( nano.utils.isMobile() )
        {
            nano.utils.setCollapsable(this);
        }
    }
});