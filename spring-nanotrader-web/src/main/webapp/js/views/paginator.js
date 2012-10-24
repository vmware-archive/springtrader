/**
 * View class for the Footer
 * @author Carlos Soto <carlos.soto>
 */
nano.views.Paginator = Backbone.View.extend({
    
    tagName: 'div',
    className: 'pagination ' + (nano.utils.isMobile() ? 'pagination-centered' : 'pagination-right'),
    cssActive: 'active',
    cssDisabled: 'disabled',
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events: {
        'click li.g2p' : 'go2page',
        'click .previous' : 'previousPage',
        'click .next' : 'nextPage'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options
     * @return void
     */
    initialize: function (options) {'use strict';},

    /**
     * Renders the Footer View
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    render: function (data) {
        'use strict';
        
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.paginator))(this.options));
        this.previous = this.$('.previous');
        this.next = this.$('.next');
        this.buttons = this.$('li.g2p');
        
        // Set the current page as active
        var pageBtn = this.$('li.p' + this.options.page);
        this.setPage(pageBtn);
               
        return this.$el;
    },
    
    /**
     * Sets the proper css classes to the different pagination buttons when one of them is clicked
     * @author Carlos Soto <carlos.soto>
     * @param objet event: Jquery Object of the clicked button
     * @return void
     */
    setPage: function (btnObj) {
        'use strict';
        var pageNumber = parseInt(btnObj.find('a').html());
        this.buttons.removeClass(this.cssActive);
        this.previous.removeClass(this.cssDisabled);
        this.next.removeClass(this.cssDisabled);
        btnObj.addClass(this.cssActive);
        if (pageNumber === 1) {
            this.previous.addClass(this.cssDisabled);    
        }
        if (pageNumber === this.options.pageCount) {
            this.next.addClass(this.cssDisabled);    
        }
    },
    
    /**
     * Click event for the pagination buttons: 1, 2, 3... N
     * @author Carlos Soto <carlos.soto>
     * @param objet event: Event Object
     * @return void
     */
    go2page: function (evt) {
        'use strict';
        var pageNumber = parseInt(evt.target.innerHTML),
            btn = $(evt.target).parent();    
        this.options.page = pageNumber;
        this.refreshUI(btn);
    },
    
    refreshUI: function (btn) {
        'use strict';
        this.options.onPageChange(this.options.page);
        this.setPage(btn);
        nano.instances.router.navigate(this.options.hash.replace(nano.conf.pageUrlKey, this.options.page), false);
    },

    /**
     * Click event for the previous button
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    previousPage: function(evt) {
        'use strict';
        if (this.options.page > 1) {
            this.options.page--;
            var btn = this.$('li.p' + this.options.page);
            this.refreshUI(btn);
        }
    },

    /**
     * Click event for the next button
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    nextPage: function(evt) {
        'use strict';
        if (this.options.page < this.options.pageCount) {
            this.options.page++;
            var btn = this.$('li.p' + this.options.page);
            this.refreshUI(btn);
        }
    }  
});
