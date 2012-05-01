<div class="well show-well">
    <div class="well">
        <table class="table table-center">
            <tbody>
                <tr>
                    <td class="gray"><%= translate("index") %>:</td>
                    <td class="gray" id="ms-index"></td>
                </tr>
                <tr>
                    <td class="gray"><%= translate("volume") %>:</td>
                    <td class="gray" id="ms-volume"></td>
                </tr>
                <tr>
                    <td class="gray"><%= translate("change") %>:</td>
                    <td class="gray">
                        <span id="ms-change"></span><span id="ms-change-arrow"></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <table class="table">
        <thead>
        <tr>
            <th class="green-color" colspan="2"><i class="icon-custom icon-gains"></i><%= translate("daysGains") %></th>
            <th class="red-color" colspan="2"><i class="icon-custom icon-lost"></i><%= translate("daysLosses") %></th>
        </tr>
        </thead>
        <tbody>
            <% for (var i in topGainers) { %>
            <tr>
                <td id="ms-tg-sym-<%= i %>" class="caps" title=""></td>
                <td class="green-color gray">+<span id="ms-tg-change-<%= i %>" ></span>&uarr;</td>

                <td id="ms-tl-sym-<%= i %>" class="caps" title=""></td>
                <td class="red-color gray"><span id="ms-tl-change-<%= i %>" ></span>&darr;</td>
            </tr>
            <% } %>
        </tbody>
    </table>
</div>