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
        'click #logout' : 'logout',
        'click #nb-logo' : 'navigationClick',
        'click .nav-link' : 'navigationClick',
        'click #profile' : 'profile',
        'click #help' : 'help',
        'click #admin' : 'admin'
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
        var hashMap = {};
        if (!hash) {
            hash = nano.conf.hash.dashboard;
        }    
        if (!this.$el.html() || this.visited === false) {
        	this.visited = true;
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.navbar))(nano.session));

            // Enable the dropdown for the User Profile options on the right
            this.$('.dropdown-toggle').dropdown(); 

            if (nano.utils.isMobile()) {
                this.collapsableMenu = this.$('#navbar-collapse');
            }

            // Cache the containers of the links 
            // (for the "active" display when clicking on the link)
            this.linkContainers = {};
            var that = this;
            this.$('ul.nav.nav-top a.nav-link').each(function(i, ele){
                that.linkContainers[ele.id] = $(ele.parentNode);
            });
            this.username = $('#nb-username');
        } else {
            this.username.html(nano.session.username);
        }
        // Maps the different hash urls to the id of the link in the navbar
        hashMap[nano.conf.hash.dashboard] = this.ids.dashboard;
        hashMap[nano.conf.hash.portfolio] = this.ids.portfolio;
        hashMap[nano.conf.hash.trade] = this.ids.trade;
        for (var i in this.linkContainers) {
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
        nano.utils.goTo( nano.conf.hash.login );
    },

    /**
     * Navigation Link Click Event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    navigationClick: function (evt) {
        'use strict';
        var id, i;
        if (evt) {
            // Mark the proper link container as "active" and
            // remove the active display on the other links
            id = evt.target.id;            
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
        } else {
            window.location = nano.conf.hash.dashboard;
        }
        if (nano.utils.isMobile()) {
            this.collapsableMenu.collapse('toggle');
        }
    },
    
    /**
     * Profile Click Event
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    profile: function () {
        'use strict';
        nano.utils.goTo( nano.conf.hash.profile );
        if(nano.utils.isMobile()) {
            this.collapsableMenu.collapse('toggle');
        }
    },
    
    /**
     * Help Click Event
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    help: function () {
        'use strict';
        nano.utils.goTo( nano.conf.hash.help );
        if (nano.utils.isMobile()) {
            this.collapsableMenu.collapse('toggle');
        }
    },

    /**
     * Admin Click Event
     * @return void
     */
    admin: function () {
        'use strict';
        nano.utils.goTo( nano.conf.hash.admin );
        if(nano.utils.isMobile()) {
            this.collapsableMenu.collapse('toggle');
        }
    }
});
