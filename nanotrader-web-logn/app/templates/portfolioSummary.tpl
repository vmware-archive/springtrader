<div class="well show-well">
    <div class="title"><h3><%= translate("portfolioSummary") %></h3></div>
    <div class="table-outer">
        <table class="table">
            <tr>
                <td><%= translate("numberOfHoldings") %></td>
                <td><%= numberOfHoldings %></td>
            </tr>
            <tr>
                <td><%= translate("purchaseBasics") %></td>
                <td><%= printCurrency(totalBasis) %></td>
            </tr>
            <tr>
                <td><%= translate("marketValue") %></td>
                <td><%= printCurrency(totalMarketValue) %></td>
            </tr>
            <tr class="summary">
                <td><%= translate("totalGainLoss") %></td>
                <td class="average <%= gain >= 0 ? "green-color" : "red-color" %>"><%= printCurrency(gain) %></td>
            </tr>
        </table>
    </div>
</div>
