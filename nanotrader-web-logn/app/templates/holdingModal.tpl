<div class="modal hide fade" id="myModal" style="display: none;">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">&times;</a>
        <h3><%= translate("orderConfirmation") %></h3>
    </div>
    <div class="modal-body">
        <table class="table">
            <tbody>
                <tr>
                    <td><%= translate("purchaseDate") %>:</td>
                    <td><%= purchasedate %></td>
                </tr>
                <tr>
                    <td><%= translate("symbol") %>:</td>
                    <td title="<%= quote.companyname %>"><%= quote.symbol %></td>
                </tr>
                <!--tr>
                    <td><%= translate("quantity") %>:</td>
                    <td><%= quantity %></td>
                </tr-->
                <tr>
                    <td><%= translate("purchasePrice") %>:</td>
                    <td><%= printCurrency(purchaseprice) %></td>
                </tr>
                <tr>
                    <td><%= translate("currentPrice") %>:</td>
                    <td><%= printCurrency(quote.price) %></td>
                </tr>
                <tr>
                    <td><%= translate("purchaseBasis") %>:</td>
                    <td class="<%= (purchaseBasis > 0 ? "green-color" : "red-color") %>"><%= printCurrency(purchaseBasis) %></td>
                </tr>
                <tr>
                    <td><%= translate("marketValue") %>:</td>
                    <td class="<%= (marketValue > 0 ? "green-color" : "red-color") %>"><%= printCurrency(marketValue) %></td>
                </tr>
                <tr>
                    <td><%= translate("totalGainLoss") %>:</td>
                    <td class="<%= (gainLoss > 0 ? "green-color" : "red-color") %> gray"><%= printCurrency(gainLoss) %><span><%= (gainLoss > 0 ? "&uarr;" : "&darr;") %></span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="modal-footer">
        <a href="#" class="btn green-btn"><%= translate("ok") %></a>
        <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
    </div>
</div>
