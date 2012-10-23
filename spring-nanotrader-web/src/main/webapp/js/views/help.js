/**
 * Help View
 * @author Jean Chassoul <jean.chassoul>
 * @author Kashyap Parikh
 */
nano.views.Help = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #profile' : 'profile',
        'click #overview' : 'overview',
        'click #admin' : 'admin'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.help = this.$el;
    },

    /**
     * Renders the Help View
     * @author Jean Chassoul <jean.chassoul>
     * @return void
     */
    render: function () {
        'use strict';
        if (!this.$el.html()) {
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.help)));
        }
        this.$el.show();
    },
    
    profile : function () {
        'use strict';
        window.location = nano.conf.hash.profile;
    },
    
    overview : function () {
        'use strict';
        window.location = nano.conf.hash.overview;
    },

    admin : function () {
        'use strict';
        window.location = nano.conf.hash.admin;
    }
});
