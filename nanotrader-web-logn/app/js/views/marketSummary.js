// HTML template
nano.templates.marketSummary = '<div class="row show-table">\
                        <div class="span4">\
                            <table class="table">\
                                <tr>\
                                    <th colspan="3"><span class="icon-custom icon-gains"></span><%= translate("daysGains") %></th>\
                                </tr>\
                                <tr class="caps">\
                                    <% for (var i in daysGains) { %>\
                                    <td title="<%= daysGains[i].companyname %>"><%= daysGains[i].symbol %></td>\
                                    <% } %>\
                                </tr>\
                                <tr>\
                                    <% for (var i in daysGains) { %>\
                                    <td title="<%= translate("price") %>"><%= nano.utils.round(daysGains[i].price) %></td>\
                                    <% } %>\
                                </tr>\
                                <tr>\
                                    <% for (var i in daysGains) { %>\
                                    <td title="<%= translate("change") %>">+<%= nano.utils.round(daysGains[i].change1) %><span>&uarr;</span></td>\
                                    <% } %>\
                                </tr>\
                            </table>\
                        </div>\
                        <div class="span4 center-table">\
                            <table class="table">\
                                <tr>\
                                    <th colspan="2"><div class="logo-table" title="<%= translate("nanotrader") %>"/></th>\
                                </tr>\
                                <tr>\
                                    <td><%= translate("index") %>:</td>\
                                    <td><%= index %></td>\
                                </tr>\
                                <tr>\
                                    <td><%= translate("volume") %>:</td>\
                                    <td><%= volume %></td>\
                                </tr>\
                                <tr>\
                                    <td><%= translate("change") %>:</td>\
                                    <td class="<%= (change > 0 ? "green-color" : "red-color") %>">\
                                    <% print((change > 0 ? "+" : "") + change) %>\
                                    <span><%= (change > 0 ? "&uarr;" : "&darr;") %></span>\
                                    </td>\
                                </tr>\
                            </table>\
                        </div>\
                        <div class="span4">\
                            <table class="table">\
                                <tr>\
                                    <th colspan="3"><span class="icon-custom icon-lost"></span><%= translate("daysLosses") %></th>\
                                </tr>\
                                <tr class="caps">\
                                    <% for (var i in daysLosses) { %>\
                                    <td title="<%= daysGains[i].companyname %>"><%= daysLosses[i].symbol %></td>\
                                    <% } %>\
                                </tr>\
                                <tr>\
                                    <% for (var i in daysLosses) { %>\
                                    <td title="<%= translate("price") %>"><%= nano.utils.round(daysLosses[i].price) %></td>\
                                    <% } %>\
                                </tr>\
                                <tr>\
                                    <% for (var i in daysLosses) { %>\
                                    <td title="<%= translate("change") %>"><!--&minus;--><%= nano.utils.round(daysLosses[i].change1) %><span>&darr;</span></td>\
                                    <% } %>\
                                </tr>\
                            </table>\
                        </div>\
            </div>';

nano.ui.MarketSummary = function(element) {
    this.element = element;
    nano.containers.marketSummary = element;

    this.render = function(callback) {
        var that = this;
        var marketSummary = new nano.models.MarketSummary();
        marketSummary.fetch({
            success : function(model, response){
                //Hide the loading Message
                nano.containers.loading.hide();

                var data = {
                    index : nano.utils.round( model.get('tradeStockIndexAverage') ),
                    volume : nano.utils.round( model.get('tradeStockIndexVolume') ),
                    change : nano.utils.round( model.get('percentGain') ),
                    daysGains : model.get('topGainers'),
                    daysLosses : model.get('topLosers')
                };
                var marketSummaryTpl = _.template(nano.templates.marketSummary)(data);
                that.element.html(marketSummaryTpl);
                callback();
            },
            error : function(model, response){}
        });
    };
};
