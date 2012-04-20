/**
 * View Class for the Navbar
 * @author Carlos Soto <carlos.soto@lognllc.com>
 * @author Kashyap Parikh
 */
nano.views.Navbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #logout' : 'logout',
        'click #nb-logo' : 'navigationClick',
        'click .nav-link' : 'navigationClick',
        'click #profile' : 'profile',
        'click #admin' : 'admin'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.navbar = this.$el;

        // Array that maps the ids of the links of
        // the navigation bar to the name of the page
        this.ids = {
            dashboard : 'nb-dashboard',
            portfolio : 'nb-portfolio',
            trade : 'nb-trade',
            admin : 'nb-admin'
        };
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.navbar)),

    /**
     * Renders the Nav Bar View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
     render : function(hash) {
        if (!hash)
        {
            var hash = nano.conf.hash.dashboard;
        }
        this.$el.html(this.template(nano.session));
        if ( !this.$el.html() )
        {
            // Enable the dropdown for the User Profile options on the right
            this.$('.dropdown-toggle').dropdown();

            // Cache the containers of the links 
            // (for the "active" display when clicking on the link)
            this.linkContainers = {};
            var that = this;
            this.$('ul.nav.nav-top a.nav-link').each(function(i, ele){
                that.linkContainers[ele.id] = $(ele.parentNode);
            });
        }
        // Maps the different hash urls to the id of the link in the navbar
        var hashMap = {};
            hashMap[nano.conf.hash.dashboard] = this.ids.dashboard;
            hashMap[nano.conf.hash.portfolio] = this.ids.portfolio;
            hashMap[nano.conf.hash.trade] = this.ids.trade;
            hashMap[nano.conf.hash.admin] = this.ids.admin;
        for (var i in this.linkContainers)
        {
            if (hashMap[hash] == i)
            {
                this.linkContainers[i].addClass('active');
            }
            else
            {
                this.linkContainers[i].removeClass('active');
            }
        }
        this.$el.show();
    },

    /**
     * Logout Click Event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    logout : function() {
        nano.utils.logout();
        nano.utils.goTo( nano.conf.hash.login );
    },

    /**
     * Navigation Link Click Event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    navigationClick : function(evt) {
        if (evt)
        {
            // Mark the proper link container as "active" and
            // remove the active display on the other links
            var id = evt.target.id;
            for (var i in this.linkContainers)
            {
                if (i == id)
                {
                    this.linkContainers[i].addClass('active');
                }
                else
                {
                    this.linkContainers[i].removeClass('active');
                }
            }

            // Depending on the link clicked, render the corresponding page
            switch(id)
            {
                case this.ids.admin:
                    window.location = nano.conf.hash.admin;
                    break;
                case this.ids.portfolio:
                    window.location = nano.conf.hash.portfolio;
                    break;
                case this.ids.trade:
                    window.location = nano.conf.hash.trade;
                    break;
                case this.ids.dashboard:
                default:
                    window.location = nano.conf.hash.dashboard;
                    break;
            }
        }
        else
        {
            window.location = nano.conf.hash.dashboard;
        }
    },
    
    /**
     * Profile Click Event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    profile : function() {
        nano.utils.goTo( nano.conf.hash.profile );
    },
    admin : function() {
        nano.utils.goTo( nano.conf.hash.admin );
    }
});
