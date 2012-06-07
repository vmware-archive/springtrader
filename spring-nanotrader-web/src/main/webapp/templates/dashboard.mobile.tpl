<div class="well show-well">
<div class="accordion" id="accordion2">
            <div class="accordion-group">
              <div class="accordion-heading">
              <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
                  Asset Distribution
                </a>
                </div>
              </div>
              <div id="collapseOne" class="accordion-body collapse in">
                <div class="accordion-inner">
                 <div id="ad-pie-chart1" class="jqplot-target">
                </div>

              </div>
            </div>
<div class="accordion-group">
              <div class="accordion-heading">
                <div class="title"><h3>
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                 Daily Top Gains
                </a>
                </h3>
                </div>
              </div>
              <div id="collapseTwo" class="accordion-body collapse">

                <div class="accordion-inner">
    <div id="dtg-pie-chart" class="jqplot-target">
</div>
    
    </div>
                </div>
              </div>
          <div class="accordion-group">
              <div class="accordion-heading">
                <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
                 Account Summary
                </a>
                </div>
              </div>
              <div id="collapseThree" class="accordion-body collapse">

                <div class="accordion-inner">
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
                
    </div>
         <div class="accordion-group">
              <div class="accordion-heading">
                <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseFour">
                 User Statistics
                </a>
                </div>
              </div>
              <div id="collapseFour" class="accordion-body collapse">

                <div class="accordion-inner">
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
        </table>
				</div>
    
    		</div>
                </div>
          </div>
