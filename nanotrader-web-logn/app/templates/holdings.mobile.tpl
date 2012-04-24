<!--div class="span12">
    <div class="well show-well">
        <div class="title">
            <a data-toggle="collapse" class="btn-transaction" data-target="#loh-content">
                <%= translate("listOfHoldings") %>
                <span></span>
            </a>
        </div>
        <div id="loh-content">
            <div class="table-outer in">
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
            <!-- The prefix "lohp" stands for "List Of Holdings Pagination" ->
            <div class="pagination pagination-right">
                <!-- The prefix "loh" stands for "List Of Holdings" ->
                <ul id="loh-pagination">
                    <li id="lohp-previous"><a>&laquo;</a></li>
                    <% for (var i = 1 ; i <= pageCount; ++i) { %>
                    <li class="g2p <%= (i == currentPage ? "active" : "") %>"><a><%= i %></a></li>
                    <% } %>
                    <li id="lohp-next"><a>&raquo;</a></li>
                </ul>
            </div>
        </div>
    </div>
</div-->

<div class="table-outer in">
    <table class="table">
        <tbody>
            <tr>
                <td><%= translate("purchaseDate") %></td>
                <td class="gray">2 / 7 /2012</td>
                <td class="gray">2 / 7 /2012</td>
            </tr>
            <tr>
                <td><%= translate("symbol") %></td>
                <td class="gray">VMW</td>
                <td class="gray">VMW</td>
            </tr>
            <tr>
                <td><%= translate("quantity") %></td>
                <td class="gray">1</td>
                <td class="gray">1</td>
            </tr>
            <tr>
                <td><%= translate("purchasePrice") %></td>
                <td class="gray">100.00</td>
                <td class="gray">100.00</td>
            </tr>
            <tr>
                <td><%= translate("purchaseDate") %></td>
                <td class="gray">125.00</td>
                <td class="gray">125.00</td>
            </tr>
            <tr>
                <td><%= translate("purchaseBasis") %></td>
                <td class="gray">100.00</td>
                <td class="gray">100.00</td>
            </tr>
            <tr>
                <td><%= translate("marketValue") %></td>
                <td class="green-color gray">125.00</td>
                <td class="green-color gray">125.00</td>
            </tr>
            <tr>
                <td><%= translate("totalGainLoss") %></td>
                <td class="green-color gray">125.00 <span>&uarr;</span></td>
                <td class="green-color gray">125.00 <span>&uarr;</span></td>
            </tr>
            <tr>
                <td><%= translate("trade") %></td>
                <td class="gray">
                    <a class="btn green-btn" data-toggle="modal" href="myModal"><%= translate("sell") %></a>
                </td>
                <td class="gray">
                    <a class="btn green-btn" data-toggle="modal" href="#myModal2"><%= translate("sell") %></a>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="pagination pagination-centered">
        <!-- The prefix "loh" stands for "List Of Holdings" -->
        <ul id="loh-pagination">
            <li id="lohp-previous"><a>&laquo;</a></li>
            <% for (var i = 1 ; i <= pageCount; ++i) { %>
            <li class="g2p <%= (i == currentPage ? "active" : "") %>"><a><%= i %></a></li>
            <% } %>
            <li id="lohp-next"><a>&raquo;</a></li>
        </ul>
    </div>
    <table class="table show-table-total">
        <tbody>
            <tr>
                <th colspan="2"><%= translate("totalOfHoldings") %></th>
            </tr>
            <tr>
                <td><%= translate("purchaseBasis") %></td>
                <td class="green-color large-size">$150.00</td>
            </tr>
            <tr>
                <td><%= translate("marketValue") %></td>
                <td class="green-color large-size">$150.00</td>
            </tr>
            <tr>
                <td><%= translate("totalGainLoss") %></td>
                <td class="green-color large-size">$150.00</td>
            </tr>
        </tbody>
    </table>
</div>