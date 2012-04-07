/**
 * View Class for the Account Summary
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.AccountSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.AccountSummary instance
     * @return void
     */
    initialize : function(options) {
        nano.containers.accountSummary = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.accountSummary)),

    /**
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
     render: function() {
            var accountSummary = this.template(this.model.toJSON());
            this.$el.html(accountSummary);
            this.$el.show();
    }
});