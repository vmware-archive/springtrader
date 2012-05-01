<tr>
    <td><%= translate("purchaseDate") %></td>
    <% for(var i in holdings) { %>
    <td><%= holdings[i].purchasedate %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("symbol") %></td>
    <% for(i in holdings) { %>
    <td title="<%= holdings[i].quote.companyname %>"><%= holdings[i].quote.symbol %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("quantity") %></td>
    <% for(i in holdings) { %>
    <td><%= holdings[i].quantity %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("purchasePrice") %></td>
    <% for(i in holdings) { %>
    <td><%= printCurrency(holdings[i].purchaseprice) %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("currentPrice") %></td>
    <% for(i in holdings) { %>
    <td><%= printCurrency(holdings[i].quote.price) %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("purchaseBasis") %></td>
    <% for(i in holdings) { %>
    <td class="<%= (holdings[i].purchaseBasis > 0 ? "green-color" : "red-color") %>"><%= printCurrency(holdings[i].purchaseBasis) %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("marketValue") %></td>
    <% for(i in holdings) { %>
    <td class="<%= (holdings[i].marketValue > 0 ? "green-color" : "red-color") %>"><%= printCurrency(holdings[i].marketValue) %></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("totalGainLoss") %></td>
    <% for(i in holdings) { %>
    <td class="<%= (holdings[i].gainLoss > 0 ? "green-color" : "red-color") %> gray"><%= printCurrency(holdings[i].gainLoss) %> <span><%= (holdings[i].gainLoss > 0 ? "&uarr;" : "&darr;") %></span></td>
    <% } %>
</tr>
<tr>
    <td><%= translate("trade") %></td>
    <% for(i in holdings) { %>
    <td class="gray">
        <a index="<%= holdings[i].i %>" class="sell btn green-btn"><%= translate("sell") %></a>
    </td>
    <% } %>
</tr>
