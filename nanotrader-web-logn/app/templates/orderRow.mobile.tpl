<tr>
    <% _.each(orderid, function(id) { %> <td><%= id %></td> <% }); %>
</tr>
<tr>
    <td><%= orderstatus[0] %></td> 
    <% _.each(orderstatus.slice(1, orderstatus.length), function(id) { %> 
    <td>
        <span class="<%= (id == 'closed' ? "completed" : "uncompleted") %>">
            <%= (id == 'closed' ? translate("completed") : translate("pending")) %>
        </span>
    </td> <% }); %>
</tr>
<tr>
    <% _.each(opendate, function(id) { %> <td><%= id %></td> <% }); %>
</tr>
<tr>
    <% _.each(completiondate, function(id) { %> <td><%= id %></td> <% }); %>
</tr>
<tr>
    <% _.each(orderfee, function(id) { %> <td><%= id %></td> <% }); %>
</tr>
<tr>
    <% _.each(ordertype, function(id) { %> <td><%= translate(id) %></td> <% }); %>
</tr>
<tr>
    <% _.each(symbol, function(id) { %> <td><%= id %></td> <% }); %>
</tr>
<tr>
    <% _.each(quantity, function(id) { %> <td><%= id %></td> <% }); %>
</tr>
