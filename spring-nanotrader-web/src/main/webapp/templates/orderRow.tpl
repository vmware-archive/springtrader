<tr>
    <td><%= orderid %></td>
    <td>
        <span class="<%= (orderstatus == 'completed' ? "completed" : "uncompleted") %>">
            <%= (orderstatus == 'closed' ? translate("closed") : (orderstatus == 'completed' ? translate("completed") : translate("cancelled")) ) %>
        </span>
    </td>
    <td><%= opendate %></td>
    <td><%= completiondate %></td>
    <td><%= printCurrency(orderfee) %></td>
    <td><%= translate(ordertype) %></td>
    <td><%= quote.symbol %></td>
    <td><%= quantity %></td>
</tr>
