<tr>
    <td><%= symbol %></td>
    <td><%= price %></td>
    <td>
        <input type="text" id="quantity-input" class="input-mini">
        <div class="modal hide fade myModal" id="myModal" style="display: none;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">&times;</a>
                <h3><%= translate("orderConfirmation") %></h3>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tr>
                        <td><%= translate("orderId") %>:</td>
                        <td id="orderid"></td>
                    </tr>
                    <tr>
                        <td><%= translate("orderStatus") %>:</td>
                        <td id="orderstatus"><span class="completed">Completed</span></td>
                    </tr>
                    <tr>
                        <td><%= translate("creationDate") %>:</td>
                        <td id="creationdate"></td>
                    </tr>
                    <tr>
                        <td><%= translate("completionDate") %>:</td>
                        <td id="completedate"></td>
                    </tr>
                    <tr>
                        <td><%= translate("transactionFee") %>:</td>
                        <td id="transfee"></td>
                    </tr>
                    <tr>
                        <td><%= translate("symbol") %>:</td>
                        <td id="symbol"></td>
                    </tr>
                    <tr>
                        <td><%= translate("quantity") %>:</td>
                        <td id="quantity"></td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <a class="btn green-btn" data-dismiss="modal"><%= translate("ok") %></a>
            </div>
        </div>
        <a id="modalBtn" data-toggle="modal" class="btn green-btn"><%= translate("buy") %></a>
    </td>
</tr>

    
