<div class="accordion-heading">
    <div class="title">
        <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#portfolioSummaryAccordion"><%= translate("portfolioSummary") %></a>
    </div>
</div>
<div id="portfolioSummaryAccordion" class="accordion-body collapse">
    <div class="accordion-inner">
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