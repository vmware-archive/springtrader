<div class="span12">
    
    <!-- toggle -->
    <div id="toggle-orders-control" class="show-transactions hide">
        <a class="accordion-toggle"><%= translate("recentTransactions") %></a>
        <span class="border-bg"></span>
    </div>
    <!-- toggle -->
    
    <div id="orders-control" class="well show-well">
        <div class="title">
            <h3><a href="#collapseFour" class="btn-transaction" data-toggle="collapse" data-parent="#accordion2"><%= translate("recentOrders") %><span></span></a></h3>
        </div>
        <div class="table-outer collapse in"  id="collapseFour">
            <table id="list-of-orders" class="table"></table>
            <!-- The prefix "loop" stands for "List Of Orders Pagination" -->
            <div id="pagination-control" class="pagination pagination-centered">
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
    </div>
</div>
