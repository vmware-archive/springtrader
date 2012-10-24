/**
 * View class for the Footer
 * @author Carlos Soto <carlos.soto>
 */
nano.views.Footer = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #contactUsBtn' : 'contact',
        'click #helpBtn' : 'help',
        'click #switchViewBtn' : 'switchView'
    },
    
    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options: options for the view
     * @return void
     */
    initialize : function (options) {
        'use strict';
        nano.containers.footer = this.$el;
    },

    /**
     * Renders the Footer View
     * @author Winston Koh <wkoh@vmware.com>
     * @return void
     */
    render: function() {
        'use strict';
        var viewMode = nano.utils.getViewPrefCookie(),
            viewModeString = 'Mobile View',
            footer = '';
        // toggling from mobile -> full or full -> mobile
        if (viewMode === null || "fullView" === viewMode) {
            viewModeString = 'Mobile View';
        } else if ("mobileView" === viewMode) {
            viewModeString = 'Full View';
        }
        footer = _.template(nano.utils.getTemplate(nano.conf.tpls.footer))({
            switchView : viewModeString
        });
        this.$el.html(footer);
    },

    /**
     * Contact link click event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    contact: function () {
        'use strict';
        window.location = nano.conf.hash.contact;
    },

    /**
     * Help link click event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    help: function () {
        'use strict';
        window.location = nano.conf.hash.help;
    },
    
    /**
     * Switch view link click event
     * @author Winston Koh <wkoh@vmware.com>
     * @return void
     */
    switchView: function () {
        'use strict';
        var viewMode = nano.utils.getViewPrefCookie();
        // toggling from mobile -> full or full -> mobile
        if ("mobileView" === viewMode) {
            nano.utils.setViewPrefCookie("fullView");
            location.replace('index.html');
        }
        else if (viewMode === null || "fullView" === viewMode) {
            nano.utils.setViewPrefCookie("mobileView");
            location.replace('mobile.html');
        }
    }
});
