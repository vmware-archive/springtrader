<div class="span12">
    
    <!-- toggle -->
    <div id="toggle-orders-control" class="show-transactions hide">
        <a class="accordion-toggle"><%= translate("recentTransactions") %></a>
        <span class="border-bg"></span>
    </div>
    <!-- toggle -->
    <div id="orders-control" class="well show-well">
        <div class="title"><h3><%= translate("recentTransactions") %></h3></div>
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
            <tbody></tbody>
        </table>
        <div id="no-orders"></div>
    </div>
    <div class="pagination-container"/>
</div>