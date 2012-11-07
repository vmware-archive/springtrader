<div class="span2 columns sidebar">
    <div>
        <% if(fullname) { %>
        <h3><%= fullname %></h3>
        <% } %>
        <% if(email) { %>
        <p><%= email %></p>
        <% } %>
        <% if(lastlogin) { %>
        <p><%= lastlogin %></p>
        <% } %>
    </div>
    <ul class="nav nav-tabs nav-stacked">
        <li><a href="<%= nano.conf.hash.profile %>"><%= translate("profile") %></a></li>
        <li><a href="<%= nano.conf.hash.overview %>"><%= translate("applicationOverview") %></a></li>
        <li><a id="lnb-admin" href="<%= nano.conf.hash.admin %>"><%= translate("admin") %></a></li>
        <li><a href="<%= nano.conf.hash.help %>"><%= translate("help") %></a></li>
    </ul>
</div>
