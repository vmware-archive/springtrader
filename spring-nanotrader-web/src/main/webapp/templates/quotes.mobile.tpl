<div class="accordion-heading">
    <div class="title">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#quotesAccordion"><%= translate("buyShares") %></a>
    </div>
</div>
<div id="quotesAccordion" class="accordion-body collapse">
    <div class="accordion-inner">
        <div class="row span12">
            <div id="quote-control" class="well show-quote-box">
                <form class="form-inline">
                    <label><%= translate("enterSymbol") %>:</label>
                    <input id="quote-input" type="text" maxlength="5" autocomplete="off" class="span3" style="margin: 0 auto;" data-provide="typeahead" data-items="<%= quoteLength %>" data-source='<%= quoteItems %>'>
                    <button id="getQuoteBtn" class="btn btn-inverse"><%= translate("getQuote") %></button>
                </form>
            </div>
        </div>
        <div class="row span12">
            <div id="quote-error" class="alert alert-error hide">
                <a class="close" data-dismiss="alert">&times;</a>
                <%= translate("symbolDoesNotExist") %>
            </div>
        </div>
        <div class="row span4">
            <div id="quote-result" class="well show-well hide">
                <div class="title"><h3><%= translate("quote") %></h3></div>
                <table id="list-of-quotes" class="table table-striped table-bordered table-condensed">
                    <thead>
                        <tr>
                            <th><%= translate("symbol") %></th>
                            <th><%= translate("price") %></th>
                            <th><%= translate("quantity") %></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row span12">
            <div id="buy-error" class="hide alert alert-error">
                <a data-dismiss="alert" class="close">x</a>
                <%= translate("quantityError") %>
            </div>
        </div>
    </div>
</div>