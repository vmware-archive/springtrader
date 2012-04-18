<tr>
    <td><%= symbol %></td>
    <td><%= price %></td>
    <td>
        <input type="text" id="quantity-input" class="input-mini">
        <div class="modal hide fade myModal" id="myModal" style="display: none;">
            <div class="modal-header">
                <a class="close" data-dismiss="modal">&times;</a>
                <h3>Order Confirmation</h3>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tr>
                        <td>Order ID:</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Order Status:</td>
                        <td><span class="completed">Completed</span></td>
                    </tr>
                    <tr>
                        <td>Creation Date:</td>
                        <td>2 / 7 / 2012</td>
                    </tr>
                    <tr>
                        <td>Completion Date:</td>
                        <td>2 / 7 / 2012</td>
                    </tr>
                    <tr>
                        <td>Transaction Free:</td>
                        <td>VMW</td>
                    </tr>
                    <tr>
                        <td>Sympol:</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Quantily:</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn green-btn">OK</a>
                <a href="#" class="btn btn-inverse">Cancel</a>
            </div>
        </div>
        <a id="modalBtn" data-toggle="modal" class="btn green-btn">Buy</a>
    </td>
</tr>

    
