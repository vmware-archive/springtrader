<div class="row">
    <div class="span12">
        <div id="quote-control" class="well show-quote-box">
            <form class="form-inline">
                <label><%= translate("enterSymbol") %>:</label>
                <input id="quote-input" type="text" class="span3" style="margin: 0 auto;" data-provide="typeahead" data-items="4">
                <button id="getQuoteBtn" class="btn btn-inverse"><%= translate("getQuote") %></button>
            </form>
        </div>
    </div>
</div>

<div class="row">
    <div class="span12">
        <div id="quote-error" class="alert alert-error hide">
            <a class="close" data-dismiss="alert">&times;</a>
            <%= translate("symbolDoesNotExist") %>
        </div>
    </div>
</div>

<div class="row">
    <div class="span4">
        <div id="quote-result" class="well show-well hide">
            <div class="title"><h3><%= translate("quote") %></h3></div>
            <table class="table table-striped table-bordered table-condensed">
                <thead>
                    <tr>
                        <th><%= translate("symbol") %></th>
                        <th><%= translate("price") %></th>
                        <th><%= translate("quantity") %></th>
                    </tr>
                </thead>
                <tbody id="nc-quotes"></tbody>
            </table>
        </div>
    </div>
</div>

<div class="row">
    <div class="span12">
        <div class="well show-well">
            <div class="title"><h3><%= translate("recentOrders") %></h3></div>
            <table class="table table-striped table-bordered table-condensed">
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
                <tbody id="nc-orders-tbody"></tbody>
            </table>
        </div>
        <!-- Pagination controls -->
        <div id="pagination" class="pagination pagination-right"></div>
    </div>
</div>

