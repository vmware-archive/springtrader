/**
 * View Class for the List Of Holdings
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Holdings = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #loh-pagination > li.g2p' : 'go2page',
        'click #lohp-previous' : 'previousPage',
        'click #lohp-next' : 'nextPage',
        'click #list-of-holdings a.sell' : 'showModal'
    },

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
     * Templating function for the rows in the List of Holdings
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    modalTemplate : _.template(nano.utils.getTemplate(nano.conf.tpls.holdingModal)),

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

            // Store the total amount of pages
            this.pageCount = Math.ceil(this.model.length / nano.conf.itemsPerPage);

            if (page > this.pageCount)
            {
                page = this.pageCount;
            }

            var data = {
                totalPurchaseBasis : 0,
                totalMarketValue : 0, 
                totalGainLoss : 0,
                pageCount : this.pageCount,
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
            this.$el.html(tpl);
            this.tbody = this.$('#list-of-holdings > tbody');

            // For some reason, the div needs to be showing
            // before doing the collapsing functions
            this.$el.show();

            //Prepare the view for collapsing sections
            if ( nano.utils.isMobile() && !this.$el.html() )
            {
                nano.utils.setCollapsable(this);
            }

            // Store the current Page number 
            this.page = page;
            this.renderRows();
    },

    /**
     * Renders the List of holdings into the View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    renderRows: function() {
        this.tbody.html('');
        var i = (this.page - 1) * nano.conf.itemsPerPage;
        var next = i + nano.conf.itemsPerPage;
        var length = this.model.length;
        if ( nano.utils.isMobile() )
        {
            var holdings = [];
            for ( i; i < length && i < next; ++i )
            {
                holdings.push(_.extend(this.model.at(i).toJSON(), {i:i}));
            }
            this.tbody.append( this.rowTemplate({holdings : holdings}) );
        }
        else
        {
            for ( i; i < length && i < next; ++i )
            {
                this.tbody.append( this.rowTemplate(_.extend(this.model.at(i).toJSON(), {i:i})) );
            }
        }
    },

    /**
     * Click event for the pagination buttons: 1, 2, 3... N
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param objet evt: Event Object
     * @return void
     */
    go2page : function(evt) {
        var pageNumber = evt.target.innerHTML;
        window.location = nano.conf.hash.portfolioWithPage.replace(nano.conf.pageUrlKey, pageNumber);
    },

    /**
     * Click event for the previous button
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    previousPage : function() {
        if ( this.page > 1 )
        {
            window.location = nano.conf.hash.portfolioWithPage.replace( nano.conf.pageUrlKey, (this.page-1) );
        }
    },

    /**
     * Click event for the next button
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    nextPage : function(evt) {
        if ( this.page < this.pageCount )
        {
            window.location = nano.conf.hash.portfolioWithPage.replace( nano.conf.pageUrlKey, (parseInt(this.page)+1) );
        }
    },

    /**
     * Click event for the "sell" buttons: displays the 
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    showModal : function(evt){
        var i = $(evt.target).attr('index');
        var model = this.model.at(i);
        var popup = $( this.modalTemplate(model.toJSON()) );
        var view = this;
        popup.modal();
        popup.find('#loh-sell').click(function(){
            $.ajax({
                url : nano.conf.urls.sellHolding.replace(nano.conf.accountIdUrlKey, nano.session.accountid),
                type : 'POST',
                headers : nano.utils.getHttpHeaders(),
                dataType : 'json',
                data : JSON.stringify({
                    holdingid : model.get('holdingid'),
                    ordertype : 'sell'
                }),
                success : function(data, textStatus, jqXHR){
                    // Clear the HTML of the View so that it gets 
                    // re-rendered and all of the values get recalculated
                    view.$el.html('');
                    nano.instances.router.portfolio(view.page);
                },
                error : nano.utils.onApiError
            });
        });
    }
});
