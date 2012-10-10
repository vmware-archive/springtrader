/**
 * View Class for the List Of Orders
 * @author Jean Chassoul <jean.chassoul>
 */
nano.views.Orders = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #loo-pagination > li.g2p' : 'go2page',
        'click #loop-previous' : 'previousPage',
        'click #loop-next' : 'nextPage',
        'click #toggle-orders-control a' : 'toggle'
    },

    /**
     * Class constructor
     * @author Jean Chassoul <jean.chassoul>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.orders = this.$el;
    },

    /**
     * Renders the List Of Orders View
     * @author Jean Chassoul <jean.chassoul>
     * @param nano.models.Orders model: Collection of orders
     * @param int page: page of the List of Orders to display
     * @return void
     */
    render: function(model, page, hash) {

        if (model) {
            this.model = model;
        }

        if (hash) {
            this.hash = hash;
        }

        var freshRender = this.$el.html() == '';

        // Store the total amount of pages
        this.pageCount = Math.ceil(this.model.totalRecords / this.model.pageSize);

        if (page > this.pageCount){
            page = this.pageCount;
        }

        // The interval start and end pages to render on the pagination
        this.interval = nano.utils.getPaginationInterval(page, this.pageCount);
        
        var data = {
            pageCount : this.pageCount,
            interval : this.interval,
            currentPage : page
        };

        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.orders))(data));

        this.tbody = this.$('#list-of-orders > tbody'); // tbody of the orders list
        this.paginators = this.$('#loo-pagination > li.g2p'); // Paginator controls
        this.previous = this.$('#loop-previous'); // "previous" link control
        this.next = this.$('#loop-next'); // "next" link control 
        this.paginationControl = this.$('#pagination-control'); // Orders Pagination Control

        // For some reason, the div needs to be showing
        // before doing the collapsing functions
        this.$el.show();
        //Prepare the view for collapsing sections
        if ( nano.utils.isMobile() ){
            this.ordersContent = this.$('#orders-content'); // Orders List Content
            
            nano.utils.setCollapsable(this);

            // Check the hash and enable or desable the toggle funtionality on mobile
            if (this.hash == nano.conf.hash.dashboardWithPage || this.hash == nano.conf.hash.tradeWithPage){
                if (!freshRender ){
                    this.ordersContent.collapse('show');
                } else {
                    this.ordersContent.collapse('hide');
                }
            }

            if (location.hash == nano.conf.hash.dashboard || location.hash == nano.conf.hash.trade){
                this.ordersContent.collapse('hide');
            }

        } else {
            this.toggleControl = this.$('#toggle-orders-control'); // Toggle Control
            this.ordersControl = this.$('#orders-control'); // Orders Control
            
            // Check the hash and enable or disable the toggle list functionality
            if ( location.hash == nano.conf.hash.dashboard || this.hash == nano.conf.hash.dashboardWithPage ) {
                this.toggleControl.removeClass('hide');
                this.$('#orders-control div.title').addClass('hide');

                // Collapse the toggle only if it's a fresh render
                if( freshRender ){
                    this.toggleControl.addClass('active');
                    this.ordersControl.hide();
                    this.paginationControl.hide();
                }

            } else {
                this.toggleControl.addClass('hide');
                this.$('#orders-control div.title').removeClass('hide');
                this.ordersControl.show();
                this.paginationControl.show();
            }
        }

        // Enable/disable the pagination next and previous controls
        if (page == 1){
            this.previous.addClass('disabled');
        }
        else {
            this.previous.removeClass('disabled');
        }
        if (page == this.pageCount){
            this.next.addClass('disabled');
        }
        else {
            this.next.removeClass('disabled');
        }
        
        // Check the page count of orders
        if (this.pageCount > 0){
            // Render the list of orders
            this.renderRows(page);
        } else {
            // Render a no orders message
            this.noOrders();
            this.next.addClass('disabled');
            this.previous.addClass('disabled');
        }

        // Store the current Page number 
        this.page = page;
    },

    /**
     * Renders the List of orders into the View
     * @author Jean Chassoul <jean.chassoul>
     * @param int page: page of the List of Orders to display
     * @return void
     */
    renderRows: function(page) {

        var i = 0;
        var length = this.model.length;

        if (nano.utils.isMobile()){
            var rows = this.tbody.html('');

            var orders = [];
            for ( i; i < length; ++i )
            {
                orders.push(_.extend(this.model.at(i).toJSON(), {i:i}));
            }
            rows.append( _.template(nano.utils.getTemplate(nano.conf.tpls.orderRow))({orders : orders}) );
        }
        else
        {
            var rows = this.tbody.html('');
            for ( i; i < length; ++i ) {
                rows.append( _.template(nano.utils.getTemplate(nano.conf.tpls.orderRow))(_.extend(this.model.at(i).toJSON(), {i:i})) );
            }
        }
    },

    /**
     * Click event for the pagination buttons: 1, 2, 3... N
     * @author Jean Chassoul <jean.chassoul>
     * @param objet event: Event Object
     * @return void
     */
    go2page : function(event) {
        var pageNumber = event.target.innerHTML;
        window.location = this.hash.replace(nano.conf.pageUrlKey, pageNumber);
    },

    /**
     * Click event for the previous button
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    previousPage : function() {
        if ( this.page > 1 ){
            window.location = this.hash.replace( nano.conf.pageUrlKey, (this.page-1) );
        }
    },

    /**
     * Click event for the next button
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    nextPage : function(event) {
        if ( this.page < this.pageCount ){
            window.location = this.hash.replace( nano.conf.pageUrlKey, (parseInt(this.page)+1) );
        }
    },
    
   /**
    * Click event for the toggle button
    * @author Jean Chassoul <jean.chassoul>
    * @return void
    */
    toggle : function(event){
        this.toggleControl.toggleClass('active');
        this.ordersControl.toggle();
        this.paginationControl.toggle();
    },
    
    /**
     * Renders a no orders list message
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    noOrders : function() {
        var htmlId = this.$('#no-orders');
        htmlId.html(_.template(nano.utils.getTemplate(nano.conf.tpls.warning))({msg:'noDataAvailable'}) );
    }
    
});



