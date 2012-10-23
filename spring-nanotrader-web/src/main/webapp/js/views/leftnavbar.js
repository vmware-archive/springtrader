/**
 * View Class for the Left Navbar
 * @author Jean Chassoul <jean.chassoul>
 */
nano.views.Leftnavbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events: {
        'click #lnb-profile' : 'profile',
        'click #lnb-overview' : 'overview',
        'click #lnb-admin' : 'admin',
        'click #lnb-help' : 'help'
    },

    /**
     * Class constructor
     * @author Jean Chassoul <jean.chassooul>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.leftnavbar = this.$el;
    },

    /**
     * Renders the Left Nav Bar View
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
     render: function (data) {
        'use strict';
        if (!data) {
            data = {
                fullname : false,
                email : false
            }
        }
        
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.leftnavbar))(data));        
        this.$el.show();
        
        if (nano.session.username !== "admin") {
        	$('#lnb-admin').remove();
        } else {
        	$('#lnb-admin').show();
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
    },

    /**
     * Overview Click Event
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    overview: function () {
        'use strict';
        nano.utils.goTo( nano.conf.hash.overview );
    },
    
    /**
     * Help Click Event
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    help: function () {
        'use strict';
        nano.utils.goTo( nano.conf.hash.help );
    },

    /**
     * Admin Click Event
     * @return void
     */
    admin: function () {
        'use strict';
        nano.utils.goTo( nano.conf.hash.admin );
    }
});
