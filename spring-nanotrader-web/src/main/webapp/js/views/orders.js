/**
 * View Class for the List Of Orders
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
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
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.orders = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.orders)),

    /**
     * Templating function for the rows in the List of Orders
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    rowTemplate : _.template(nano.utils.getTemplate(nano.conf.tpls.orderRow)),

    /**
     * Renders the List Of Orders View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param nano.models.Orders model: Collection of orders
     * @param int page: page of the List of Orders to display
     * @return void
     */
    render: function(model, page, hash) {
        if (model){
            this.model = model;
        }

        if (hash){
            this.hash = hash;
        }

        // Store the total amount of pages
        this.pageCount = Math.ceil(this.model.totalRecords / this.model.pageSize);

        if (page > this.pageCount){
            page = this.pageCount;
        }

        var data = {
            pageCount : this.pageCount,
            currentPage : page
        };
        
        this.$el.html(this.template(data));
        
        // Check the device
        if (nano.utils.isMobile()){
            // Set a table variable for store the rows on a mobile device
            this.table = this.$('#orders-content > table');
        } else {
            // tbody variable used for store the rows on a computer device.
            this.tbody = this.$('#list-of-orders > tbody');
        }
        
        // Paginator controls
        this.paginators = this.$('#loo-pagination > li.g2p');
        this.previous = this.$('#loop-previous');
        this.next = this.$('#loop-next');
            
        // Toggle Control
        this.toggleControl = this.$('#toggle-orders-control');
        // Orders Control
        this.ordersControl = this.$('#orders-control');
        // Orders Pagination Control
        this.paginationControl = this.$('#pagination-control');

        // For some reason, the div needs to be showing
        // before doing the collapsing functions
        this.$el.show();
        //Prepare the view for collapsing sections
        if ( nano.utils.isMobile() )
        {
            nano.utils.setCollapsable(this);
        }
        
        if (this.hash.indexOf('dashboard') != -1){
            this.toggleControl.removeClass('hide');
            this.$('#orders-control div.title').addClass('hide');
            
            if(this.toggleControl.hasClass('active')){
                this.ordersControl.show();
                this.paginationControl.show();
            } else {
                this.ordersControl.hide();
                this.paginationControl.hide();
            }
        } else {
            this.toggleControl.addClass('hide');
            this.$('#orders-control div.title').removeClass('hide');
            this.ordersControl.show();
            this.paginationControl.show();
        }

        //Set the page number on the paginator
        this.paginators.removeClass('active');        

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

        if (this.pageCount > 0){
            this.paginators[page-1].className = 'g2p active';
            // Render the list of orders
            this.renderRows(page);
        }

        // Store the current Page number 
        this.page = page;
    },

    /**
     * Renders the List of orders into the View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param int page: page of the List of Orders to display
     * @return void
     */
    renderRows: function(page) {
        var i = 0;
        var length = this.model.length;
        
        if (nano.utils.isMobile()){
            var rows = this.table.html('');

            var orders = [];
            for ( i; i < length; ++i )
            {
                orders.push(_.extend(this.model.at(i).toJSON(), {i:i}));
            }
            rows.append( this.rowTemplate({orders : orders}) );
        }
        else
        {
            var rows = this.tbody.html('');
            for ( i; i < length; ++i ) {
                rows.append( this.rowTemplate(_.extend(this.model.at(i).toJSON(), {i:i})) );
            }
        }
    },

    /**
     * Click event for the pagination buttons: 1, 2, 3... N
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @param objet event: Event Object
     * @return void
     */
    go2page : function(event) {
        var pageNumber = event.target.innerHTML;
        window.location = this.hash.replace(nano.conf.pageUrlKey, pageNumber);
    },

    /**
     * Click event for the previous button
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    previousPage : function() {
        if ( this.page > 1 ){
            window.location = this.hash.replace( nano.conf.pageUrlKey, (this.page-1) );
        }
    },

    /**
     * Click event for the next button
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    nextPage : function(event) {
        if ( this.page < this.pageCount ){
            window.location = this.hash.replace( nano.conf.pageUrlKey, (parseInt(this.page)+1) );
        }
    },
    
    toggle : function(event){
        if(this.toggleControl.hasClass('active')) {

            this.ordersControl.hide();
            this.paginationControl.hide();
            this.toggleControl.removeClass('active');
        } else {
            this.ordersControl.show();
            this.paginationControl.show();
            this.toggleControl.addClass('active');
        }
    }
});



