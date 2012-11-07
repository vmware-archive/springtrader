/**
 * View Class for the Left Navbar
 * @author Jean Chassoul <jean.chassoul>
 */
nano.views.Leftnavbar = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events: {},

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
        	this.$('#lnb-admin').remove();
        }
    },
});
