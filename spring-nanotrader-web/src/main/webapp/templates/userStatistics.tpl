<div class="well show-well">
    <div class="title"><h3><%= translate("userStatistics") %></h3></div>
    <div class="table-outer">
        <table class="table">
            <tr>
                <td><%= translate("accountId") %></td>
                <td><%= accountid %></td>
            </tr>
            <tr>
                <td><%= translate("accountCreationDate") %></td>
                <td><%= creationdate %></td>
            </tr>
            <tr>
                <td><%= translate("totalLogins") %></td>
                <td><%= logincount %></td>
            </tr>
            <tr>
                <td><%= translate("sessionCreationDate") %></td>
                <td><%= lastlogin %></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
</div>
