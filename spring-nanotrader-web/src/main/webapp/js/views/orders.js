/**
 * View Class for the List Of Orders
 * @author Carlos Soto <carlos.soto>
 */
nano.views.Orders = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #toggle-orders-control a' : 'toggle'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.orders = this.$el;
    },

    /**
     * Renders the List Of Orders View
     * @author Carlos Soto <carlos.soto>
     * @param nano.models.Orders model: Collection of orders
     * @param int page: page of the List of Orders to display
     * @return void
     */
    render: function(model, page, hash) {
        'use strict';
        var ordersContent,
            paginator,
            title,
            pageCount = Math.ceil(model.totalRecords / model.pageSize);

        if (page > pageCount) {
            page = pageCount;
        }
        paginator = new nano.views.Paginator({
            pageCount: pageCount,            
            page: page,
            hash: hash,
            interval: nano.utils.getPaginationInterval(page, pageCount),
            onPageChange: _.bind(function(page) {
                model.fetch({
                    data : { page : page},
                    success : _.bind(function (model, response) {
                        this.renderRows(model);
                    }, this),
                    error : nano.utils.onApiError
                });    
            }, this)
        });
        

        // If it hasn't been rendered yet, build the section and store the key dom objects
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.orders))());        
        // Embed the paginator into the container
        this.$el.find('.pagination-container').html(paginator.render());
        this.$el.show();
        this.tbody = this.$('#list-of-orders > tbody'); // tbody of the orders list
        this.toggleControl = this.$('#toggle-orders-control'); // Toggle Control
        this.ordersControl = this.$('#orders-control'); // Orders Control
        this.paginationControl = this.$('.pagination-container');
        
        //Prepare the view for collapsing sections
        if (!nano.utils.isMobile()) {
            title = this.$('div.title');
            // Check the hash and enable or disable the toggle list functionality
            if (location.hash === nano.conf.hash.dashboard || hash === nano.conf.hash.dashboardWithPage) {
                this.toggleControl.show();
                title.hide();
            } else {
                this.toggleControl.hide();
                title.show();
            }
        }
        
        // Check the page count of orders
        if (pageCount > 0) {
            // Render the list of orders
            this.renderRows(model);
        } else {
            // Render a no orders message
            this.noOrders();
        }
    },
    

    /**
     * Renders the List of orders into the View
     * @author Carlos Soto <carlos.soto>
     * @param int page: page of the List of Orders to display
     * @return void
     */
    renderRows: function(model) {
        var i = 0,
            length = model.length,
            orders = [], // Used only for Mobile only
            rows = '';
        if (nano.utils.isMobile()) {
             for ( i; i < length; ++i ) {
                orders.push(_.extend(model.at(i).toJSON(), {i:i}));
            }
            rows =  _.template(nano.utils.getTemplate(nano.conf.tpls.orderRow))({orders : orders});
        } else {
            for ( i; i < length; ++i ) {
                rows += _.template(nano.utils.getTemplate(nano.conf.tpls.orderRow))(_.extend(model.at(i).toJSON(), {i:i}));
            }
        }
        this.tbody.html(rows);
    },
    
   /**
    * Click event for the toggle button
    * @author Carlos Soto <carlos.soto>
    * @return void
    */
    toggle : function(event){
        this.toggleControl.toggleClass('active');
        this.ordersControl.toggle();
        this.paginationControl.toggle();
    },
    
    /**
     * Renders a no orders list message
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    noOrders : function() {
        var htmlId = this.$('#no-orders');
        htmlId.html(_.template(nano.utils.getTemplate(nano.conf.tpls.warning))({msg:'noDataAvailable'}) );
    }
    
});



