<div class="accordion-heading">
    <div class="title">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#accountSummaryAccordion"><%= translate('accountSummary') %></a>
    </div>
</div>

<div id="accountSummaryAccordion" class="accordion-body table-outer collapse">
    <table class="accordion-inner table">
        <tr>
            <td><%= translate("currentBalance") %></td>
            <td class="gray-background"><%= printCurrency(balance + totalMarketValue) %></td>
        </tr>
        <tr>
            <td><%= translate("openingBalance") %></td>
            <td class="gray-background"><%= printCurrency(openbalance) %></td>
        </tr>
        <tr>
            <td><%= translate("cashBalance") %></td>
            <td class="gray-background"><%= printCurrency(balance) %></td>
        </tr>
        <tr>
            <td><%= translate("holdingsTotal") %></td>
            <td class="gray-background"><%= printCurrency(round(totalMarketValue)) %></td>
        </tr>
        <tr class="summary <%= (gain > 0 ? nano.conf.successCss : nano.conf.errorCss ) %>">
            <td><%= translate("currentGainLoss") %></td>
            <td class="average"><%= printCurrency(gain) %></td>
        </tr>
    </table>
</div>
