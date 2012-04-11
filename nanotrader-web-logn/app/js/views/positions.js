/**
 * View Class for the Positions
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
 nano.views.Positions = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.positions = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.positions)),

    /**
     * Renders the Positions View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of nano.models.holdingSummary
     * @return void
     */
     render : function(model) {
        if (model)
        {
            this.model = model;
        }

        this.$el.html(this.template());
        this.$el.show();

        var data = [];
        var holdingRollups = model.get('holdingRollups');
        for (var i in holdingRollups)
        {
            data.push([holdingRollups[i].symbol, holdingRollups[i].percent]);
        }
        var plot1 = jQuery.jqplot ('dtg-pie-chart', [data], {
            grid: {
                    background: '#ffffff',      // CSS color spec for background color of grid.
                    borderColor: '#ffffff',     // CSS color spec for border around grid.
                    shadow: false               // draw a shadow for grid.
            },
            seriesDefaults: {
                // Make this a pie chart.
                renderer: jQuery.jqplot.PieRenderer,
                rendererOptions: {
                    // Put data labels on the pie slices.
                    // By default, labels show the percentage of the slice.
                    showDataLabels: true
                }
            },
            legend: { show:true, location: 'e' }
        });

    }
});