// HTML template
nano.templates.portfolio = '<div class="well show-well">\
                                <div class="title"><h3>Portfolio</h3><a class="tooltip-question"></a></div>\
                                <div class="jqplot-target">\
                                    <img src="./images/diagramm1.jpg" alt="" />\
                                    <table class="jqplot-table-legend" style="position: absolute; right: 10px; top: 51.5px;">\
                                        <tbody>\
                                            <tr class="jqplot-table-legend">\
                                                <td class="jqplot-table-legend" style="text-align: center; padding-top: 0pt;">\
                                                    <div><div class="jqplot-table-legend-swatch" style="border-color: rgb(243, 185, 25); background-color: rgb(75, 178, 197);"></div></div>\
                                                </td>\
                                                <td class="jqplot-table-legend" style="padding-top: 0pt;">GOOG</td>\
                                            </tr>\
                                            <tr class="jqplot-table-legend">\
                                                <td class="jqplot-table-legend" style="text-align: center; padding-top: 0.5em;">\
                                                    <div><div class="jqplot-table-legend-swatch" style="border-color: rgb(71, 183, 233); background-color: rgb(234, 162, 40);"></div></div>\
                                                </td>\
                                                <td class="jqplot-table-legend" style="padding-top: 0.5em;">AAPL</td></tr>\
                                            <tr class="jqplot-table-legend">\
                                                <td class="jqplot-table-legend" style="text-align: center; padding-top: 0.5em;">\
                                                    <div><div class="jqplot-table-legend-swatch" style="border-color: rgb(123, 185, 65); background-color: rgb(197, 180, 127);"></div></div>\
                                                </td>\
                                                <td class="jqplot-table-legend" style="padding-top: 0.5em;">VMW</td>\
                                            </tr>\
                                            <tr class="jqplot-table-legend">\
                                                <td class="jqplot-table-legend" style="text-align: center; padding-top: 0.5em;">\
                                                    <div><div class="jqplot-table-legend-swatch" style="border-color: rgb(239, 229, 45); background-color: rgb(87, 149, 117);"></div></div>\
                                                </td>\
                                                <td class="jqplot-table-legend" style="padding-top: 0.5em;">Others</td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </div>\
                            </div>';

nano.ui.Portfolio = function(element) {
    this.element = element;
    nano.containers.portfolio = element;

    this.render = function() {

        if ( !this.element.html() )
        {
            var data = {};
            var portfolioTpl = _.template(nano.templates.portfolio)(data);
            this.element.html(portfolioTpl);
        }
        this.element.show();
    };

};
