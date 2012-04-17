<div class="row">
    <div class="span12">
        <div class="well show-quote-box">
            <form class="form-inline">
                <label><%= translate("enterSymbol") %>:</label>
                <input type="text" class="span3" style="margin: 0 auto;" data-provide="typeahead" data-items="4" data-source='["VML","APPL","GOOG"]'>
                <button href="#" class="btn btn-inverse"><%= translate("getQuote") %></button>
            </form>
        </div>
    </div>
</div>

<div class="row">
    <div class="span12">
        <div class="alert alert-error hide">
            <a class="close" data-dismiss="alert">&times;</a>
            <%= translate("symbolDoesNotExist") %>
        </div>
    </div>
</div>

<div class="row">
    <div class="span12">
        <div class="well show-well">
            <div class="title"><h3><%= translate("resentOrders") %></h3></div>
            <table class="table table-striped table-bordered table-condensed">
                <thead>
                    <tr>
                        <th><%= translate("orderId") %></th>
                        <th><%= translate("orderStatus") %></th>
                        <th><%= translate("creationDate") %></th>
                        <th><%= translate("completionDate") %></th>
                        <th><%= translate("transactionFee") %></th>
                        <th><%= translate("transactionType") %></th>
                        <th><%= translate("sympol") %></th>
                        <th><%= translate("quantity") %></th>
                    </tr>
                </thead>
                <tbody id="nc-orders-tbody"></tbody>
            </table>
        </div>
        <!-- Pagination controls -->
        <div id="pagination" class="pagination pagination-right"></div>
    </div>
</div>

