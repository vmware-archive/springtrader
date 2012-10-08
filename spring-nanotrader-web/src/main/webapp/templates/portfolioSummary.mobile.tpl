<div class="well show-well">
<div class="accordion" id="accordion3">
            <div class="accordion-group">
              <div class="accordion-heading">
              <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion3" href="#collapseportfolioOne">
                  Portfolio Summary
                </a>
                </div>
              </div>
              <div id="collapseportfolioOne" class="accordion-body collapse in">
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
            </div>
<div class="accordion-group">
              <div class="accordion-heading">
                <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion3" href="#collapseportfolioTwo">
                 Asset Distribution
                </a>
                </div>
              </div>
              <div id="collapseportfolioTwo" class="accordion-body collapse">

                <div class="accordion-inner">
    <div id="ad-pie-chart" class="jqplot-target">
    </div>
                </div>
              </div>
            </div>
            
          </div>
          </div>
