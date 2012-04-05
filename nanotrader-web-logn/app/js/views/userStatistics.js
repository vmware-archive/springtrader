/**
 * HTML template for the User Statistics
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.templates.userStatistics = '<div class="well show-well">\
                                    <div class="title"><h3><%= translate("userStatistics") %></h3></div>\
                                    <div class="table-outer">\
                                        <table class="table">\
                                            <tr>\
                                                <td><%= translate("accountId") %></td>\
                                                <td><%= accountid %></td>\
                                            </tr>\
                                            <tr>\
                                                <td><%= translate("accountCreationDate") %></td>\
                                                <td><%= creationdate %></td>\
                                            </tr>\
                                            <tr>\
                                                <td><%= translate("totalLogins") %></td>\
                                                <td><%= logincount %></td>\
                                            </tr>\
                                            <tr>\
                                                <td><%= translate("sessionCreatedDate") %></td>\
                                                <td><%= lastlogin %></td>\
                                            </tr>\
                                            <tr>\
                                                <td>&nbsp;</td>\
                                                <td>&nbsp;</td>\
                                            </tr>\
                                        </table>\
                                    </div>\
                                </div>';

/**
 * View Class for the User Statistics
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.UserStatistics = function(element) {
    this.element = element;
    nano.containers.userStatistics = element;

    /**
     * Renders the User Statistic View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param nano.models.Account: instance of the model with the info to be displayed
     * @return void
     */
    this.render = function(model) {
        var that = this;

        // Render the login block only if it hasn't been rendered before.
        if ( !this.element.html() )
        {
            var userStatistics = _.template(nano.templates.userStatistics)(model.attributes);
            this.element.html(userStatistics);
        }
        this.element.show();
    };
};
