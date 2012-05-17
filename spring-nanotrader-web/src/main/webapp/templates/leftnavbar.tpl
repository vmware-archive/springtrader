<div class="span2 columns sidebar">
    <div>
        <% if(fullname) { %>
        <h3><%= fullname %></h3>
        <% } %>
        <% if(email) { %>
        <p><%= email %></p>
        <% } %>
    </div>
    <ul class="nav nav-tabs nav-stacked">
        <li><a id="lnb-profile"><%= translate("profile") %></a></li>
        <li><a id="lnb-overview"><%= translate("applicationOverview") %></a></li>
        <li><a id="lnb-admin"><%= translate("admin") %></a></li>
        <li><a id="lnb-help"><%= translate("help") %></a></li>
    </ul>
</div>
