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
                var data = {
                    totalPurchaseBasis : 0,
                    totalMarketValue : 0, 
                    totalGainLoss : 0,
                    pageCount : Math.ceil(this.model.length / nano.conf.itemsPerPage),
                    currentPage : page
                };

                this.model.each(function(holding) {
                    var quote = holding.get('quote');
                    holding.set( "purchaseBasis", holding.get('quantity') * holding.get('purchaseprice') );
                    holding.set( "marketValue", holding.get('quantity') * quote.price );
                    holding.set( "gainLoss", holding.get('marketValue') - holding.get("purchaseBasis") );

                    data.totalPurchaseBasis += holding.get( "purchaseBasis");
                    data.totalMarketValue += holding.get( "marketValue");
                    data.totalGainLoss += holding.get( "gainLoss");
                });
                var tpl = this.template(data);
                this.tbody = this.$('#list-of-holdings > tbody');
            }
            // Clear it
            else
            {
                //set the page number on the paginator
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
        this.tbody.html('');
        var i = (page - 1) * nano.conf.itemsPerPage;
        var next = i + nano.conf.itemsPerPage;
        var length = this.model.length;
        for ( i; i < length && i < next; ++i )
        {
            console.log('i: ' + i);
            conso.log('model:' + this.model.at(i));
            this.tbody.append( this.rowTemplate(this.model.at(i).toJSON()) );
        }
    }
});