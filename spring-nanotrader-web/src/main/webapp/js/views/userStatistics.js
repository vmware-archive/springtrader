/**
 * View Class for the User Statistics
 * @author Carlos Soto <carlos.soto>
 */
nano.views.UserStatistics = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.Account instance
     * @return void
     */
    initialize : function (options) {
        'use strict';
        nano.containers.userStatistics = this.$el;
    },

    /**
     * Renders the Portfolio View
     * @author Carlos Soto <carlos.soto>
     * @param Object model: Instance of nano.models.UserStatistics
     * @return void
     */
     render : function (model) {
        'use strict';
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.userStatistics))(model.toJSON()));
        this.$el.show();
    }
});