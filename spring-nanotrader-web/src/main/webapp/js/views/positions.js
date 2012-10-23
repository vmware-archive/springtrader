/**
 * View Class for the Positions
 * @author Carlos Soto <carlos.soto>
 */
 nano.views.Positions = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.positions = this.$el;
    },

    /**
     * Renders the Positions View
     * @author Carlos Soto <carlos.soto>
     * @param Object model: Instance of nano.models.holdingSummary
     * @return void
     */
     render: function (model) {
        'use strict';
        var i,
            plot1,
            data = [],
            holdingRollups = model.get('holdingRollups');
            
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.positions))());
        this.$el.show();

        for (i in holdingRollups) {
        	if (holdingRollups[i].percent != 0)
            data.push([holdingRollups[i].symbol, holdingRollups[i].percent]);
        }
        plot1 = nano.utils.renderPieChart('dtg-pie-chart', data);
    }
});