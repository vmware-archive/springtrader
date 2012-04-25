<div class="well show-well">
    <div class="title"><h3><%= translate("accountSummary") %></h3></div>
    <div class="table-outer">
        <table class="table">
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
</div>
