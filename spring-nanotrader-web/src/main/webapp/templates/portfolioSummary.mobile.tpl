<div class="well show-well">
    <div class="title">
        <h3>
            <a data-toggle="collapse" class="btn-transaction" data-target="#ps-content">
                <%= translate("portfolioSummary") %>
                <span></span>
            </a>
        </h3>
    </div>
    <div id="ps-content" class="table-outer collapse in">
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
