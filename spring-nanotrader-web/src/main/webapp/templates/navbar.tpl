<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
      <div class="container">
          <a data-target="div#navbar-collapse" data-toggle="collapse" class="btn btn-navbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a id="nb-logo" class="logo brand"><%= translate("nanotrader") %></a>
          <div id="navbar-collapse" class="nav-collapse">
              <ul class="nav nav-top">
                  <li class="divider-vertical"></li>
                  <li><a id="nb-dashboard" class="nav-link"><span class="icon-home icon-white"></span><%= translate("dashboard") %></a></li>
                  <li class="divider-vertical"></li>
                  <li><a id="nb-portfolio" class="nav-link"><span class="icon-custom icon-portfolio"></span><%= translate("portfolio") %></a></li>
                  <li class="divider-vertical"></li>
                  <li><a id="nb-trade" class="nav-link"><span class="icon-custom icon-trade"></span><%= translate("trade") %></a></li>
                  <li class="divider-vertical"></li>
              </ul>
              <div class="navbar-text pull-right">
                  <ul class="nav">
                      <li class="divider-vertical"></li>
                      <li class="dropdown" id="fat-menu"><a class="dropdown-toggle pull-right" data-toggle="dropdown">
                              <span class="icon-custom icon-user"></span>
                              <span id="nb-username"><%= username %></span>
                              <span class="icon-down-arrow"></span>
                          </a>
                          <div class="dropdown-menu">
                              <ul class="dropdown-nav">
                                  <li><a id="profile"><%= translate("profile") %></a></li>
                                  <li><a id="help"><%= translate("help") %></a></li>
                                  <li class="divider"></li>
                                  <li><a id="logout"><%= translate("logout") %></a></li>
                              </ul>
                          </div>
                      </li>
                      <li class="divider-vertical"></li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</div>
