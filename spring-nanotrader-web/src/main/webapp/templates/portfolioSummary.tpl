<div class="well show-well">
    <div class="title"><h3><%= translate("portfolioSummary") %></h3></div>
    <div class="table-outer">
        <table class="table">
            <tbody>
                <tr>
                    <td><%= translate("numberOfHoldings") %></td>
                    <td><%= numberOfHoldings %></td>
                </tr>
                <tr>
                    <td><%= translate("purchaseBasis") %></td>
                    <td><%= printCurrency(totalBasis) %></td>
                </tr>
                <tr>
                    <td><%= translate("marketValue") %></td>
                    <td><%= printCurrency(totalMarketValue) %></td>
                </tr>
                <tr class="summary <%= (gain > 0 ? nano.conf.successCss : nano.conf.errorCss ) %>">
                    <td><%= translate("totalGainLoss") %></td>
                    <td class="average"><%= printCurrency(gain) %></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
