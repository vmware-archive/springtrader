// HTML template
nano.templates.accountSummary = '<div class="well show-well">\
                                    <div class="title"><h3><%= translate("accountSummary") %></h3></div>\
                                    <div class="table-outer">\
                                        <table class="table">\
                                            <tr>\
                                                <td><%= translate("currentBalance") %></td>\
                                                <td>$<%= nano.utils.round(balance) %></td>\
                                            </tr>\
                                            <tr>\
                                                <td><%= translate("openingBalance") %></td>\
                                                <td>$<%= nano.utils.round(openbalance)%></td>\
                                            </tr>\
                                            <tr>\
                                                <td><%= translate("cashBalance") %></td>\
                                                <td>$<%= "N/A" %></td>\
                                            </tr>\
                                            <tr>\
                                                <td><%= translate("holdingsTotal") %></td>\
                                                <td><%= "N/A" %></td>\
                                            </tr>\
                                            <tr class="summary">\
                                                <td><%= translate("currentGainLoss") %></td>\
                                                <td class="average">$<%= "N/A" %></td>\
                                            </tr>\
                                        </table>\
                                    </div>\
                                </div>';

nano.ui.AccountSummary = function(element) {
    this.element = element;
    nano.containers.accountSummary = element;

    this.render = function(model) {
        var that = this;

        // Render the login block only if it hasn't been rendered before.
        if ( !this.element.html() )
        {
            var accountSummary = _.template(nano.templates.accountSummary)(model.attributes);
            this.element.html(accountSummary);
        }
        this.element.show();
    };
};
