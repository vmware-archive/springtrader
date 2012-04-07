<div class="row show-table">
    <div class="span4">
        <table class="table">
            <tr>
                <th colspan="3"><span class="icon-custom icon-gains"></span><%= translate("daysGains") %></th>
            </tr>
            <tr class="caps">
                <% for (var i in topGainers) { %>
                <td title="<%= topGainers[i].companyname %>"><%= topGainers[i].symbol %></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topGainers) { %>
                <td title="<%= translate("price") %>"><%= nano.utils.round(topGainers[i].price) %></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topGainers) { %>
                <td title="<%= translate("change") %>">+<%= nano.utils.round(topGainers[i].change1) %><span>&uarr;</span></td>
                <% } %>
            </tr>
        </table>
    </div>
    <div class="span4 center-table">
        <table class="table">
            <tr>
                <th colspan="2"><div class="logo-table" title="<%= translate("nanotrader") %>"/></th>
            </tr>
            <tr>
                <td><%= translate("index") %>:</td>
                <td><%= nano.utils.round(tradeStockIndexAverage) %></td>
            </tr>
            <tr>
                <td><%= translate("volume") %>:</td>
                <td><%= nano.utils.round(tradeStockIndexVolume) %></td>
            </tr>
            <tr>
                <td><%= translate("change") %>:</td>
                <td class="<%= (percentGain > 0 ? "green-color" : "red-color") %>">
                <% print((percentGain > 0 ? "+" : "") + nano.utils.round(percentGain)) %>
                <span><%= (percentGain > 0 ? "&uarr;" : "&darr;") %></span>
                </td>
            </tr>
        </table>
    </div>
    <div class="span4">
        <table class="table">
            <tr>
                <th colspan="3"><span class="icon-custom icon-lost"></span><%= translate("daysLosses") %></th>
            </tr>
            <tr class="caps">
                <% for (var i in topLosers) { %>
                <td title="<%= topLosers[i].companyname %>"><%= topLosers[i].symbol %></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topLosers) { %>
                <td title="<%= translate("price") %>"><%= nano.utils.round(topLosers[i].price) %></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topLosers) { %>
                <td title="<%= translate("change") %>"><!--&minus;--><%= nano.utils.round(topLosers[i].change1) %><span>&darr;</span></td>
                <% } %>
            </tr>
        </table>
    </div>
</div>