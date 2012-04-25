<div class="well show-well">
    <div class="title">
        <h3>
            <a data-toggle="collapse" class="btn-transaction" data-target="#orders-content">
                <%= translate("recentOrders") %>
                <span></span>
            </a>
        </h3>
    </div>
    <div id="orders-content" class="table-outer collapse in">
        <table class="table"></table>
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
