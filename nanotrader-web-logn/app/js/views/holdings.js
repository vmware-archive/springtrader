/**
 * View Class for the List Of Holdings
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Holdings = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {},

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.holdings = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.holdings)),

    /**
     * Renders the List Of Holdings View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param nano.models.Holdings model: Collection of holdings
     * @param int page: page of the List of Holdings to display
     * @return void
     */
     render: function(model, page) {
         alert(page);
            if (model)
            {
                this.model = model;
            }
            console.log(model.toJSON());
            var tpl = this.template(model.toJSON());
            this.$el.html(tpl);
            this.$el.show();
    }
});