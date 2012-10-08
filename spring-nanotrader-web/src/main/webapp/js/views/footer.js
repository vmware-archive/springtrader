/**
 * View class for the Footer
 * @author Carlos Soto <carlos.soto@lognllc.com>
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
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.footer = this.$el;
    },

    /**
     * Renders the Footer View
     * @author Winston Koh <wkoh@vmware.com>
     * @return void
     */
    render: function() {
        var viewMode = nano.utils.getViewPrefCookie();
        var viewModeString = 'Mobile View';
        // toggling from mobile -> full or full -> mobile
        if (viewMode == null || "fullView" == viewMode) {
            viewModeString = 'Mobile View';
        }
        else if ("mobileView" == viewMode) {
            viewModeString = 'Full View';
        }
        var data = {
            switchView : viewModeString
        };
        var footer = _.template(nano.utils.getTemplate(nano.conf.tpls.footer))(data);
        this.$el.html(footer);
    },

    /**
     * Contact link click event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    contact: function() {
        window.location = nano.conf.hash.contact;
    },

    /**
     * Help link click event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    help: function() {
        window.location = nano.conf.hash.help;
    },
    
    /**
     * Switch view link click event
     * @author Winston Koh <wkoh@vmware.com>
     * @return void
     */
    switchView: function() {
      var viewMode = nano.utils.getViewPrefCookie();
      // toggling from mobile -> full or full -> mobile
      if ("mobileView" == viewMode) {
        nano.utils.setViewPrefCookie("fullView");
        location.replace('index.html');
      }
      else if (viewMode == null || "fullView" == viewMode) {
        nano.utils.setViewPrefCookie("mobileView");
        location.replace('mobile.html');
      }
    }
});
