<div class="row">
    <div class="span12">
        <div id="quote-control" class="well show-quote-box">
            <form class="form-inline">
                <label><%= translate("enterSymbol") %>:</label>
                <input id="quote-input" type="text" class="span3" style="margin: 0 auto;" data-provide="typeahead" data-items="<%= quoteLength %>" data-source='<%= quoteItems %>'>
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
