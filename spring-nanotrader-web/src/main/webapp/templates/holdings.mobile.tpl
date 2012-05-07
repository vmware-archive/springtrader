<div class="span12">
    <div class="well show-well">
        <div class="title">
            <h3>
                <a data-target="#loh-content" data-toggle="collapse" class="btn-transaction">
                    <%= translate("listOfHoldings") %>
                    <span></span>
                </a>
            </h3>
        </div>
        <div id="loh-content" class="table-outer collapse in">
            <table id="list-of-holdings" class="table">
                <tbody>
                </tbody>
            </table>
            <div id="no-holdings"></div>
            <div class="pagination pagination-centered">
                <!-- The prefix "loh" stands for "List Of Holdings" -->
                <ul id="loh-pagination">
                    <li id="lohp-previous" class="<%= ( currentPage == 1 ? "disabled" : "") %>"><a>&laquo;</a></li>
                    <% for (var i = 1 ; i <= pageCount; ++i) { %>
                    <li class="g2p <%= (i == currentPage ? "active" : "") %>"><a><%= i %></a></li>
                    <% } %>
                    <li id="lohp-next" class="<%= ( currentPage == pageCount ? "disabled" : "") %>"><a>&raquo;</a></li>
                </ul>
            </div>
            <table class="table show-table-total">
                <tbody>
                    <tr>
                        <th colspan="2"><%= translate("totalOfHoldings") %></th>
                    </tr>
                    <tr>
                        <td><%= translate("purchaseBasis") %></td>
                        <td class="<%= (totalPurchaseBasis > 0 ? nano.conf.successCss : nano.conf.errorCss ) %> large-size">
                            <%= printCurrency(totalPurchaseBasis) %>
                        </td>
                    </tr>
                    <tr>
                        <td><%= translate("marketValue") %></td>
                        <td class="<%= (totalMarketValue > 0 ? nano.conf.successCss : nano.conf.errorCss ) %> large-size">
                            <%= printCurrency(totalMarketValue) %>
                        </td>
                    </tr>
                    <tr>
                        <td><%= translate("totalGainLoss") %></td>
                        <td class="<%= (totalGainLoss > 0 ? nano.conf.successCss : nano.conf.errorCss ) %> large-size">
                            <%= printCurrency(totalGainLoss) %>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
