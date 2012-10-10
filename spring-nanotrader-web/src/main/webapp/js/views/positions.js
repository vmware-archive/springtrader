/**
 * View Class for the Positions
 * @author Carlos Soto <carlos.soto>
 */
 nano.views.Positions = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.positions = this.$el;
    },

    /**
     * Renders the Positions View
     * @author Carlos Soto <carlos.soto>
     * @param Object model: Instance of nano.models.holdingSummary
     * @return void
     */
     render : function(model) {
        if (model)
        {
            this.model = model;
        }
        this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.positions))());
        this.$el.show();

        var data = [];
        var holdingRollups = model.get('holdingRollups');
        for (var i in holdingRollups)
        {
        	if (holdingRollups[i].percent != 0)
            data.push([holdingRollups[i].symbol, holdingRollups[i].percent]);
        }
        var plot1 = nano.utils.renderPieChart('dtg-pie-chart', data);
    }
});
