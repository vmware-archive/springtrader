<div class="modal hide fade myModal" id="myModal" style="display: none;">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">&times;</a>
        <h3><%= translate("orderConfirmation") %></h3>
    </div>
    <div class="modal-body">
        <table class="table">
            <tr>
                <td><%= translate("symbol") %>:</td>
                <td><%= quote.symbol %></td>
            </tr>
            <tr>
                <td><%= translate("quantity") %>:</td>
                <td><%= quantity %></td>
            </tr>
            <tr>
                <td><%= translate("creationDate") %>:</td>
                <td><%= printDate() %></td>
            </tr>
        </table>
    </div>
    <div class="modal-footer">
        <a class="btn green-btn" data-dismiss="modal"><%= translate("ok") %></a>
    </div>
</div>
        
