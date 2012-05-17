/**
 * View Class for the Left Navbar
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.views.Leftnavbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #lnb-profile' : 'profile',
        'click #lnb-overview' : 'overview',
        'click #lnb-admin' : 'admin',
        'click #lnb-help' : 'help'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @author Jean Chassoul <jean.chassooul@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.leftnavbar = this.$el;

        // Array that maps the ids of the links of
        // the navigation bar to the name of the page
        this.ids = {
            profile : 'lnb-profile',
            overview : 'lnb-overview',
            admin : 'lnb-admin',
            help : 'lnb-help'
        };
    },

    /**
     * Renders the Left Nav Bar View
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
     render : function(data) {

        //if (!hash)
        //{
        //    var hash = nano.conf.hash.dashboard;
        //}

        if (!data){
            var data = {
                fullname : false,
                email : false
            }
        }
        
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.leftnavbar))(data));
        
        //if ( !this.$el.html() )
        //{
            //this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.leftnavbar))(nano.session));

            // Enable the dropdown for the User Profile options on the right
            //this.$('.dropdown-toggle').dropdown(); 

            //if( nano.utils.isMobile() )
            //{
            //    this.collapsableMenu = this.$('#navbar-collapse');
            //}

            // Cache the containers of the links 
            // (for the "active" display when clicking on the link)
            //this.linkContainers = {};
            //var that = this;
            //this.$('ul.nav.nav-top a.nav-link').each(function(i, ele){
            //    that.linkContainers[ele.id] = $(ele.parentNode);
            //});
            //this.username = $('#nb-username');
        //}
        //else
        //{
        //    this.username.html(nano.session.username);
        //}
        // Maps the different hash urls to the id of the link in the navbar
        //var hashMap = {};
        //    hashMap[nano.conf.hash.dashboard] = this.ids.dashboard;
        //    hashMap[nano.conf.hash.portfolio] = this.ids.portfolio;
        //    hashMap[nano.conf.hash.trade] = this.ids.trade;
        //for (var i in this.linkContainers)
        //{
        //    if (hashMap[hash] == i)
        //    {
        //        this.linkContainers[i].addClass('active');
        //    }
        //    else
        //    {
        //        this.linkContainers[i].removeClass('active');
        //    }
        //}
        this.$el.show();
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
        if( nano.utils.isMobile() )
        {
            this.collapsableMenu.collapse('hide');
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

    /**
     * Overview Click Event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    overview : function() {
        nano.utils.goTo( nano.conf.hash.overview );
    },
    
    /**
     * Help Click Event
     * @author Jean Chassoul <jean.chassoul@lognllc.com>
     * @return void
     */
    help : function() {
        nano.utils.goTo( nano.conf.hash.help );
    },

    /**
     * Admin Click Event
     * @return void
     */
    admin : function() {
        nano.utils.goTo( nano.conf.hash.admin );
    }
});
