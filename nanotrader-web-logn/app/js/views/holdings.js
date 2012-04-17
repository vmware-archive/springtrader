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
     * Templating function for the rows in the List of Holdings
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    rowTemplate : _.template(nano.utils.getTemplate(nano.conf.tpls.holdingRow)),

    /**
     * Renders the List Of Holdings View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param nano.models.Holdings model: Collection of holdings
     * @param int page: page of the List of Holdings to display
     * @return void
     */
     render: function(model, page) {
            if (model)
            {
                this.model = model;
            }
            // Render the List of Holdings container
            if ( !this.$el.html() )
            {
                this.model.each(function(holding){
                    //console.log(holding);
                    // Calculate the totals here!
                });
                var data = {
                    totalPurchaseBasis : -1,
                    totalMarketValue : -1, 
                    totalGainLoss : 1,
                    pageCount : Math.ceil(this.model.length / nano.conf.itemsPerPage),
                    currentPage : page
                };
                var tpl = this.template(data);
                this.tbody = this.$('#list-of-holdings > tbody');
            }
            // Clear it
            else
            {
                this.tbody.html('');
            }
            this.$el.html(tpl);
            this.$el.show();

            // Render the list
            this.renderRows(page);
    },

    /**
     * Renders the List of holdings into the View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param int page: page of the List of Holdings to display
     * @return void
     */
    renderRows: function(page) {
        var listTpl = _.template(nano.utils.getTemplate(nano.conf.tpls.holdingRow));
    }
});