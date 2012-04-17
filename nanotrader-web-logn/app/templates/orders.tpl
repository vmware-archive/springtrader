<tr>
    <td><%= orderid %></td>
    <td><span class="uncompleted"><%= translate("uncompleted") %></span></td>
    <td><%= opendate %></td>
    <td><%= completiondate %></td>
    <td><%= orderfee %></td>
    <td>
        <input type="text" placeholder="" class="input-mini">
        <div class="modal hide fade myModal" id="myModal2" style="display: none;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">&times;</a>
                <h3><%= translate("orderConfirmation") %></h3>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tr>
                        <td><%= translate("orderId") %>:</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><%= translate("orderStatus") %>:</td>
                        <td><span class="completed"><%= translate("completed") %></span></td>
                    </tr>
                    <tr>
                        <td><%= translate("creationDate") %>:</td>
                        <td>2 / 7 / 2012</td>
                    </tr>
                    <tr>
                        <td><%= translate("completionDate") %>:</td>
                        <td>2 / 7 / 2012</td>
                    </tr>
                    <tr>
                        <td><%= translate("transactionFree") %>:</td>
                        <td>VMW</td>
                    </tr>
                    <tr>
                        <td><%= translate("sympol") %>:</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><%= translate("quantity") %>:</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn green-btn"><%= translate("ok") %></a>
                <a href="#" class="btn btn-inverse"><%= translate("cancel") %></a>
            </div>
        </div>
        <a href="#myModal2" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
    </td>
    <td><%= quote.symbol %></td>
    <td><%= quantity %></td>
</tr>
