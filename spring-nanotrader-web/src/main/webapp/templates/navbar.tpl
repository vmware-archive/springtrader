<div class="navbar">
  <div class="navbar-inner">
      <div class="container">
        <a class="btn btn-navbar" data-target=".nav-collapse" data-toggle="collapse">
        <!--a class="btn btn-navbar"-->
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
          <a href="<%= nano.conf.hash.dashboard %>"class="logo brand"><%= translate("nanotrader") %></a>
          <div class="nav-collapse">
              <ul class="nav nav-top">
                  <li class="divider-vertical"></li>
                  <li><a id="nb-dashboard" class="nav-link"><span id="nb-icon-dashboard" class="icon-home icon-white"></span><%= translate("dashboard") %></a></li>
                  <li class="divider-vertical"></li>
                  <li><a id="nb-portfolio" class="nav-link"><span id="nb-portfolio-icon" class="icon-custom icon-portfolio"></span><%= translate("portfolio") %></a></li>
                  <li class="divider-vertical"></li>
                  <li><a id="nb-trade" class="nav-link"><span id="nb-trade-icon" class="icon-custom icon-trade"></span><%= translate("trade") %></a></li>
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
                                  <li><a id="profile" href="<%= nano.conf.hash.profile %>"><%= translate("profile") %></a></li>
                                  <% if (nano.session.username === "admin") { %>
                                  <li><a id="admin" href="<%= nano.conf.hash.admin %>"><%= translate("admin") %></a></li>
                                  <% } %>
                                  <li><a id="help" href="<%= nano.conf.hash.help %>"><%= translate("help") %></a></li>
                                  <li class="divider"></li>
                                  <li><a id="logout" href="nano.conf.hash.login"><%= translate("logout") %></a></li>
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
