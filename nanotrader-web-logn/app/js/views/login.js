// HTML template
nano.templates.login = '<div class="row show-table">\
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
                                    <td title="<%= translate("volume") %>"><%= nano.utils.round(daysGains[i].volume) %></td>\
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
                                    <td title="<%= translate("volume") %>"><%= nano.utils.round(daysLosses[i].volume) %></td>\
                                    <% } %>\
                                </tr>\
                                <tr>\
                                    <% for (var i in daysLosses) { %>\
                                    <td title="<%= translate("change") %>"><!--&minus;--><%= nano.utils.round(daysLosses[i].change1) %><span>&darr;</span></td>\
                                    <% } %>\
                                </tr>\
                            </table>\
                        </div>\
            </div>\
            <div class="row clearfix">\
                <div class="span9 columns">\
                    <form class="form-horizontal">\
                        <fieldset>\
                            <h3><%= translate("login") %><span><%= translate("enterUsername") %></span></h3>\
                            <div class="span4">\
                                <div class="control-group">\
                                    <label for="focusedInput" class="control-label"><%= translate("email") %>:</label>\
                                    <div class="controls">\
                                        <input type="text" value="" id="focusedInput" class="input-xlarge focused">\
                                        <label class="checkbox"><input type="checkbox"/> <%= translate("rememberMe") %></label>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="span4">\
                                <div class="control-group">\
                                    <label for="focusedInput" class="control-label"><%= translate("password") %>:</label>\
                                    <div class="controls"><input type="password" value="" id="focusedInput" class="input-xlarge focused"/></div>\
                                </div>\
                            </div>\
                            <div class="form-actions">\
                                <a href="#" class="forgot-password pull-left"><%= translate("forgotPassword") %></a>\
                                <button class="btn green-btn"><%= translate("login") %></button>\
                            </div>\
                        </fieldset>\
                    </form>\
                </div>\
                <div class="span2 columns sidebar">\
                    <h3><%= translate("registration") %></h3>\
                    <p><%= translate("dontHaveNanotrader") %></p>\
                    <p><a><%= translate("pleaseRegister") %></a></p>\
                </div>\
            </div>\
        </div>';

nano.ui.Login = function(element) {
    this.element = element;
    nano.containers.login = element;

    this.render = function() {
        var that = this;
        var marketSummary = new nano.models.MarketSummary();
        marketSummary.fetch({
            success : function(model, response){
                console.log(model);

                //Hide the loading Message
                nano.containers.loading.hide();

                var data = {
                    index : nano.utils.round( model.get('tradeStockIndexAverage') ),
                    volume : nano.utils.round( model.get('tradeStockIndexVolume') ),
                    change : nano.utils.round( model.get('tradeStockIndexOpenAverage') ),
                    daysGains : model.get('topGainers'),
                    daysLosses : model.get('topLosers')
                };
                var login = _.template(nano.templates.login)(data);
                that.element.html(login);

            },
            error : function(model, response){}
        });
    };
};
