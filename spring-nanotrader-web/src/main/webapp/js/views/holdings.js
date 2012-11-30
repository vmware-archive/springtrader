/**
 * View Class for the List Of Holdings
 * @author Carlos Soto <carlos.soto>
 */
nano.views.Holdings = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #list-of-holdings a.sell' : 'showModal'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function (options) {
        'use strict';
        nano.containers.holdings = this.$el;
    },

    /**
     * Renders the List Of Holdings View
     * @author Carlos Soto <carlos.soto>
     * @param nano.collections.Holdings collection: Collection of holdings
     * @param int page: page of the List of Holdings to display
     * @return void
     */
     render: function (collection, page) {
            'use strict';
            var pageCount = Math.ceil(collection.totalRecords / collection.pageSize),
                data = {
                    totalPurchaseBasis: 0,
                    totalMarketValue: 0, 
                    totalGainLoss: 0
                };
                
            if (collection) {
                this.collection = collection;
            }
            if (page > pageCount) {
                page = pageCount;
            }
            this.paginator = new nano.views.Paginator({
                pageCount: pageCount,            
                page: page,
                hash: nano.conf.hash.portfolioWithPage,
                interval: nano.utils.getPaginationInterval(page, pageCount),
                onPageChange: _.bind(function(page) {
                    this.collection.fetch({
                        data : { page : page},
                        success : _.bind(function (collection, response) {
                            this.collection = this.setTotals(collection, data);
                            this.renderRows(this.collection);
                        }, this),
                        error : nano.utils.onApiError
                    });    
                }, this)
            });

            this.collection = this.setTotals(collection, data);
            this.$el.html(_.template( nano.utils.getTemplate(nano.conf.tpls.holdings) )(data));
            this.$el.find('.pagination-container').html(this.paginator.render());
            this.tbody = this.$('#list-of-holdings > tbody');
            this.$el.show();

            // Check the page count of orders
            if (pageCount <= 0) {
                // Render a no data message if the page count is 0 or less.
                this.noHoldings();
                if (nano.utils.isMobile()) {
                    this.$('#list-of-holdings').hide();
                } else {
                    this.$('#list-of-holdings > tfoot').hide();
                }
                
            }  
            this.renderRows(this.collection);
    },
    
    /**
     * Sets the Total Puchase Basis, Market Value and Gain/Loss for every holding
     * @author Carlos Soto <carlos.soto>
     * @param Holdings Collection: Backbone collection
     * @return Holdings: same collection with the new variables
     */
    setTotals: function (collection, data) {
        'use strict';
        collection.each(function(holding) {
                var quote = holding.get('quote');
                holding.set( "purchaseBasis", holding.get('quantity') * holding.get('purchaseprice') );
                holding.set( "marketValue", holding.get('quantity') * quote.price );
                holding.set( "gainLoss", holding.get('marketValue') - holding.get("purchaseBasis") );

                data.totalPurchaseBasis += holding.get( "purchaseBasis");
                data.totalMarketValue += holding.get( "marketValue");
                data.totalGainLoss += holding.get( "gainLoss");
            });
        return collection;
    },

    /**
     * Renders the List of holdings into the View
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    renderRows: function (collection) {
        'use strict';
        var i = 0,
            length = collection.length,
            holdings = [], // Used only for Mobile only
            rows = '';
        if (nano.utils.isMobile()) {
             for ( i; i < length; ++i ) {
                if (collection.at(i).id == nano.conf.lastSellOrderId) {
                    // this order was submitted for sell, lets not show it in holding table
                	continue;
                }
                holdings.push(_.extend(collection.at(i).toJSON(), {i:i}));
            }
            rows =  _.template(nano.utils.getTemplate(nano.conf.tpls.holdingRow))({holdings : holdings});
        } else {
            for ( i; i < length; ++i ) {
                if (collection.at(i).id == nano.conf.lastSellOrderId) {
                    // this order was submitted for sell, lets not show it in holding table
                    continue;
                }
                rows += _.template(nano.utils.getTemplate(nano.conf.tpls.holdingRow))(_.extend(collection.at(i).toJSON(), {i:i}));
            }
        }
        this.tbody.html(rows);
    },

    /**
     * Click event for the "sell" buttons: displays the 
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    showModal : function (evt) {
        'use strict';
        var i = $(evt.target).attr('index'),
            model = this.collection.at(i),
            popup = $(_.template(nano.utils.getTemplate(nano.conf.tpls.holdingModal))(model.toJSON())),
            view = this;
        popup.modal();
        popup.find('#loh-sell').click(_.bind(function () {
            $.ajax({
                url: nano.conf.urls.sellHolding.replace(nano.conf.accountIdUrlKey, nano.session.accountid),
                type: 'POST',
                headers: nano.utils.getHttpHeaders(),
                dataType: 'json',
                data: JSON.stringify({
                    holdingid : model.get('holdingid'),
                    ordertype : 'sell'
                }),
                success: _.bind(function (data, textStatus, jqXHR) {
                    Backbone.history.loadUrl(Backbone.history.fragment);
                    // Save holding id for this sell order
                    // In case server is still processing the sell order and 
                    // returns it as a holding we use this id and hide it from holding table
                    nano.conf.lastSellOrderId = model.get('holdingid');
                }, this),
                error: nano.utils.onApiError
            });
        }, this));
    },
    
    /**
     * Renders a no holdings list message
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    noHoldings : function () {
        'use strict';
        var htmlId = this.$('#no-holdings');
        htmlId.html(_.template(nano.utils.getTemplate(nano.conf.tpls.warning))({msg:'noDataAvailable'}) );
    }
});
