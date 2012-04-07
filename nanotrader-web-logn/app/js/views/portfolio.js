/**
 * View Class for the Portfolio
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
 nano.views.Portfolio = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.portfolio = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.portfolio)),

    /**
     * Renders the Portfolio View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
     render : function() {
        this.$el.html(this.template());
        this.$el.show();
    }
});