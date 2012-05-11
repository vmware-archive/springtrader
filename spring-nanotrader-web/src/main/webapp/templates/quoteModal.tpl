<div class="modal hide fade myModal" id="myModal" style="display: none;">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">&times;</a>
        <h3><%= translate("orderConfirmation") %></h3>
    </div>
    <div class="modal-body">
        <table class="table">
            <tr>
                <td><%= translate("orderId") %>:</td>
                <td><%= orderid %></td>
            </tr>
            <tr>
                <td><%= translate("orderStatus") %>:</td>
                <td>
                    <span class="<%= (orderstatus == 'completed' ? "completed" : "uncompleted") %>">
                        <%= (orderstatus == 'closed' ? translate("closed") : (orderstatus == 'completed' ? translate("completed") : translate("cancelled")) ) %>
                    </span>
                </td>
            </tr>
            <tr>
                <td><%= translate("creationDate") %>:</td>
                <td><%= opendate %></td>
            </tr>
            <tr>
                <td><%= translate("completionDate") %>:</td>
                <td><%= completiondate %></td>
            </tr>
            <tr>
                <td><%= translate("transactionFee") %>:</td>
                <td><%= orderfee %></td>
            </tr>
            <tr>
                <td><%= translate("symbol") %>:</td>
                <td><%= quote.symbol %></td>
            </tr>
            <tr>
                <td><%= translate("quantity") %>:</td>
                <td><%= orderQuantity %></td>
            </tr>
        </table>
    </div>
    <div class="modal-footer">
        <a class="btn green-btn" data-dismiss="modal"><%= translate("ok") %></a>
    </div>
</div>
        
