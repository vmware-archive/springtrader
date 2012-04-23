<div class="well show-well">
    <div class="title">
        <h3>
            <a data-target="div#us-user-statistics" data-toggle="collapse" class="btn-transaction" data-toggle="collapse">
                <%= translate('userStatistics') %>
                <span></span>
            </a>
        </h3>
    </div>
    <div id="us-user-statistics" class="table-outer collapse in">
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
                <td><%= translate("sessionCreatedDate") %></td>
                <td><%= lastlogin %></td>
            </tr>
        </table>
    </div>
</div>