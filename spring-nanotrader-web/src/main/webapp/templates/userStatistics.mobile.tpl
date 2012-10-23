<div class="accordion-heading">
    <div class="title">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#userStatisticsAccordion"><%= translate('userStatistics') %></a>
    </div>
</div>
<div id="userStatisticsAccordion" class="table-outer accordion-body collapse">
    <table class="table accordion-inner">
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
    </table>
</div>

