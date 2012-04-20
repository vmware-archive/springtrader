<div class="span12">
    <div class="well show-well">
        <div class="title"><h3><%= translate("recentOrders") %></h3></div>
        <table id="list-of-orders" class="table table-striped table-bordered table-condensed">
            <thead>
                <tr>
                    <th><%= translate("orderId") %></th>
                    <th><%= translate("orderStatus") %></th>
                    <th><%= translate("creationDate") %></th>
                    <th><%= translate("completionDate") %></th>
                    <th><%= translate("transactionFee") %></th>
                    <th><%= translate("transactionType") %></th>
                    <th><%= translate("symbol") %></th>
                    <th><%= translate("quantity") %></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <!-- The prefix "loop" stands for "List Of Orders Pagination" -->
    <div class="pagination pagination-right">
        <!-- The prefix "loo" stands for "List Of Orders" -->
        <ul id="loo-pagination">
            <li id="loop-previous"><a>&laquo;</a></li>
            <% for (var i = 1 ; i <= pageCount; ++i) { %>
            <li class="g2p <%= (i == currentPage ? "active" : "") %>"><a><%= i %></a></li>
            <% } %>
            <li id="loop-next"><a>&raquo;</a></li>
        </ul>
    </div>
</div>
