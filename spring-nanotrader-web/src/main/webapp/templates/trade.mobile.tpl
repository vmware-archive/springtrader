
<div class="well show-well">

<div class="accordion" id="accordion1">
            <div class="accordion-group">
              <div class="accordion-heading">
              <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#collapsetradeOne">
                  Buy Shares
                </a>
                </div>
              </div>
              <div id="collapsetradeOne" class="accordion-body collapse in">
                <div class="accordion-inner">
                 <div id="quote-control" class="well show-quote-box">
            <form class="form-inline">
                <label><%= translate("enterSymbol") %>:</label>
                <input id="quote-input" type="text" class="input-mini" style="margin: 0 auto;" data-provide="typeahead" data-items="4">
                <button id="getQuoteBtn" class="btn btn-inverse"><%= translate("getQuote") %></button>
            </form>
              
        </div>
     
          <div id="nc-quotes"></div>
            
                </div>

              </div>
            </div>
            <div class="accordion-group">
              <div class="accordion-heading">
              <div class="title">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#collapsetradeTwo">
                  Sell Shares
                </a>
                </div>
              </div>
              <div id="collapsetradeTwo" class="accordion-body collapse">
                <div class="accordion-inner">
              
            <div id="nc-holdings">
            </div>
                </div>
                </div>
                </div>
     </div>

     </div>