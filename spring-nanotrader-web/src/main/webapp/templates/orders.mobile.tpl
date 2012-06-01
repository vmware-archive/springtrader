<div class="well show-well">
    <div class="title">
        <h3>
            <a data-toggle="collapse" class="btn-transaction" data-target="#orders-content">
                <%= translate("recentTransactions") %>
                <span></span>
            </a>
        </h3>
    </div>
    <div id="orders-content" class="table-outer collapse">
        <table id="list-of-orders" class="table"><tbody></tbody></table>
        <div id="no-orders"></div>
        <!-- The prefix "loop" stands for "List Of Orders Pagination" -->
        <div id="pagination-control" class="pagination pagination-centered">
            <!-- The prefix "loo" stands for "List Of Orders" -->
            <ul id="loo-pagination">
                <li id="loop-previous" class="<%= ( currentPage == 1 ? "disabled" : "") %>"><a>&laquo;</a></li>
                <% for (var i = interval.start; i < interval.end; ++i) { %>
                <li class="g2p <%= (i+1 == currentPage ? "active" : "") %>"><a><%= i+1 %></a></li>
                <% } %>
                <li id="loop-next" class="<%= ( currentPage == pageCount ? "disabled" : "") %>"><a>&raquo;</a></li>
            </ul>
        </div>
    </div>
</div>
