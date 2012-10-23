/**
 * View Class for the Navbar
 * @author Carlos Soto <carlos.soto>
 * @author Kashyap Parikh
 */
nano.views.Navbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events: {
        'click #logout': 'logout',
        'click #nb-logo': 'navigationClick',
        'click .nav-link': 'navigationClick',
        'click .nav-top a, .dropdown-nav a': 'linkClick'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.navbar = this.$el;
        this.visited = false;
        // Array that maps the ids of the links of
        // the navigation bar to the name of the page
        this.ids = {
            dashboard : 'nb-dashboard',
            portfolio : 'nb-portfolio',
            portfolioIcon : 'nb-portfolio-icon',
            trade : 'nb-trade',
            tradeIcon : 'nb-trade-icon'
        };
    },
    
    renderLogin: function (hash) {
        'use strict';
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.navbar_login))());
        this.$el.show();
        this.visited = false;
    },

    /**
     * Renders the Nav Bar View
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
     render: function (hash) {
        'use strict';
        var hashMap = {},
            i;
            
        if (!hash) {
            hash = nano.conf.hash.dashboard;
        }    
        if (!this.$el.html() || this.visited === false) {
        	this.visited = true;
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.navbar))(nano.session));
            this.$('.dropdown-toggle').dropdown(); // Enable the dropdown for the User Profile options on the right
            this.username = this.$('#nb-username');
            this.collapsableMenu = this.$('.nav-collapse');

            // --------------------
            // Cache the containers of the links 
            // (for the "active" display when clicking on the link)
            this.linkContainers = {};
            this.$('ul.nav.nav-top a.nav-link').each(_.bind(function(i, ele){
                this.linkContainers[ele.id] = $(ele.parentNode);
            }, this));
        } else {
            this.username.html(nano.session.username);
        }
        
        // Maps the different hash urls to the id of the link in the navbar
        hashMap[nano.conf.hash.dashboard] = this.ids.dashboard;
        hashMap[nano.conf.hash.portfolio] = this.ids.portfolio;
        hashMap[nano.conf.hash.trade] = this.ids.trade;
        for (i in this.linkContainers) {
            if (hashMap[hash] === i) {
                this.linkContainers[i].addClass('active');
            } else {
                this.linkContainers[i].removeClass('active');
            }
        }
        this.$el.show();
    },

    /**
     * Logout Click Event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    logout: function () {
        'use strict';
        nano.utils.logout();
    },

    /**
     * Click event for all of the links on the navigation bar
     * @author Carlos Soto <carlos.soto>
     * @return void
     */    
    linkClick: function () {
        'use strict';
        // Manually hide the collapsable menu, collapse('hide') function from
        // Bootstrap messes up the whole nav on Mobile devices, makes it stop working
        this.collapsableMenu.removeClass('in');
        this.collapsableMenu.css('height', '0px');
    },

    /**
     * Navigation Link Click Event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    navigationClick: function (evt) {
        'use strict';
        var id = evt.target.id,
            i;
            // Mark the proper link container as "active" and
            // remove the active display on the other links
        for (i in this.linkContainers) {
            if (i === id) {
                this.linkContainers[i].addClass('active');
            } else {
                this.linkContainers[i].removeClass('active');
            }
        }
        // Depending on the link clicked, render the corresponding page
        switch (id) {
            case this.ids.portfolio:
                window.location = nano.conf.hash.portfolio;
                break;
            case this.ids.portfolioIcon:
                window.location = nano.conf.hash.portfolio;
                break;
            case this.ids.trade:
                window.location = nano.conf.hash.trade;
                break;
            case this.ids.tradeIcon:
                window.location = nano.conf.hash.trade;
                break;
            case this.ids.dashboard:
            default:
                window.location = nano.conf.hash.dashboard;
                break;
        }
    }
});
