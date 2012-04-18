<tr>
    <td><%= purchasedate %></td>
    <td title="<%= quote.companyname %>"><%= quote.symbol %></td>
    <td><%= quantity %></td>
    <td><%= printCurrency(purchaseprice) %></td>
    <td><%= printCurrency(quote.price) %></td>
    <td class="<%= (purchaseBasis > 0 ? "green-color" : "red-color") %>"><%= printCurrency(purchaseBasis) %></td>
    <td class="<%= (marketValue > 0 ? "green-color" : "red-color") %>"><%= printCurrency(marketValue) %></td>
    <td class="<%= (gainLoss > 0 ? "green-color" : "red-color") %> gray"><%= printCurrency(gainLoss) %> <span><%= (gainLoss > 0 ? "&uarr;" : "&darr;") %></span></td>
    <td class="gray"><a href="#myModal" data-toggle="modal" class="btn green-btn"><%= translate("sell") %></a></td>
</tr>