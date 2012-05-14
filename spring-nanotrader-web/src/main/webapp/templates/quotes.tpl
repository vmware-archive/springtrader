<div class="span4">
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

<div class="span6">
    <div id="buy-error" class="hide span6 alert alert-block alert-error fade in">
        <a data-dismiss="alert" class="close">x</a>
        <h4 class="alert-heading"></h4>
        <p><%= translate("quantityError") %></p>
    </div>
</div>
