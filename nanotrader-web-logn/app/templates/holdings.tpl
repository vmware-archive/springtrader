<div class="span12">
    <div class="well show-well">
        <div class="title"><h3><%= translate("listOfHoldings") %></h3></div>
            <div class="table-outer">
                <table id="list-of-holdings" class="table table-striped table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th><%= translate("purchaseDate") %></th>
                            <th><%= translate("symbol") %></th>
                            <th><%= translate("quantity") %></th>
                            <th><%= translate("purchasePrice") %></th>
                            <th><%= translate("currentPrice") %></th>
                            <th><%= translate("purchaseBasis") %></th>
                            <th><%= translate("marketValue") %></th>
                            <th><%= translate("totalGainLoss") %></th>
                            <th><%= translate("trade") %></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr class="summary bold <%= (totalGainLoss > 0 ? nano.conf.successCss : nano.conf.errorCss ) %>">
                            <td colspan="5"><%= translate("total") %></td>
                            <td class="large-size"><%= printCurrency(totalPurchaseBasis) %></td>
                            <td class="large-size"><%= printCurrency(totalMarketValue) %></td>
                            <td class="large-size"><%= printCurrency(totalGainLoss) %></td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="pagination pagination-right">
            <ul>
                <li class="disabled"><a href="#">&laquo;</a></li>
                <% for (var i = 1 ; i <= pageCount; ++i) { %>
                <li class="<%= (i == currentPage ? "active" : "") %>"><a><%= i %></a></li>
                <% } %>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</div>