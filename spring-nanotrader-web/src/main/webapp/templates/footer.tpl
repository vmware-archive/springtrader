<div class="footer container clearfix">
    <p class="pull-left"><%= translate("copyright") %></p>
    <ul class="nav pull-left">
        <li><a id="contactUsBtn"><%= translate("contactUs") %></a> <span class="divider">|</span></li>
        <% if ($.cookie( nano.conf.sessionCookieName ) != null) { %>
          <li><a id="helpBtn" class="help"><%= translate("help") %></a> <span class="divider">|</span></li>
          <li><a id="logoutBtn"><%= translate("logout") %></a></li>
       <% } else { %>
          <li><a id="helpBtn" class="help"><%= translate("help") %></a> <span class="divider"></span></li>
        <% } %>
    </ul>
</div>
