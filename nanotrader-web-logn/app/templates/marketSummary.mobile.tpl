<div class="row show-table">
    <div class="well show-well">
        <div class="well">
            <table class="table table-center">
                <tbody>
                    <tr>
                        <td><%= translate("index") %>:</td>
                        <td id="ms-index"></td>
                    </tr>
                    <tr>
                        <td><%= translate("volume") %>:</td>
                        <td id="ms-volume"></td>
                    </tr>
                    <tr>
                        <td><%= translate("change") %>:</td>
                        <td>
                            <span id="ms-change"></span><span id="ms-change-arrow"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th class="green-color" colspan="2"><i class="icon-custom icon-gains"></i><%= translate("daysGains") %></th>
                <th class="red-color" colspan="2"><i class="icon-custom icon-lost"></i><%= translate("daysLosses") %></th>
            </tr>
            </thead>
            <tbody>
                <% for (var i in topGainers) { %>
                <tr>
                    <td id="ms-tg-sym-<%= i %>" class="caps" title=""></td>
                    <td class="green-color">+<span id="ms-tg-change-<%= i %>" ></span>&uarr;</td>

                    <td id="ms-tl-sym-<%= i %>" class="caps" title=""></td>
                    <td class="red-color"><span id="ms-tl-change-<%= i %>" ></span>&darr;</td>
                </tr>
                <% } %>
            </tbody>
        </table>
    </div>
</div>


<!--div class="row show-table">
    <div class="span4">
        <table class="table">
            <tr>
                <th colspan="3"><span class="icon-custom icon-gains"></span><%= translate("daysGains") %></th>
            </tr>
            <tr class="caps">
                <% for (var i in topGainers) { %>
                <td id="ms-tg-sym-<%= i %>" title=""></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topGainers) { %>
                <td id="ms-tg-price-<%= i %>" title=""></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topGainers) { %>
                <td id="ms-tg-change-<%= i %>" title="">
                    <span>&uarr;</span>
                </td>
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
                <td id="ms-index"></td>
            </tr>
            <tr>
                <td><%= translate("volume") %>:</td>
                <td id="ms-volume"></td>
            </tr>
            <tr>
                <td><%= translate("change") %>:</td>
                <td>
                <span id="ms-change"></span>
                <span id="ms-change-arrow"></span>
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
                <td id="ms-tl-sym-<%= i %>" title=""></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topLosers) { %>
                <td id="ms-tl-price-<%= i %>" title=""></td>
                <% } %>
            </tr>
            <tr>
                <% for (var i in topLosers) { %>
                <td id="ms-tl-change-<%= i %>" title=""><span>&darr;</span></td>
                <% } %>
            </tr>
        </table>
    </div>
</div-->