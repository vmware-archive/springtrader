/**
 * View class for the Footer
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Footer = Backbone.View.extend({
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.footer = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.footer)),

    /**
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    render: function() {
            var footer = this.template();
            this.$el.html(footer);
    }
});
