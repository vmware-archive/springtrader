<div class="row">
    <h3><%= translate("login") %><span><%= translate("enterUsername") %></span></h3>
</div>
<div class="row clearfix">
    <div id="login-error" class="span9 alert alert-block alert-error fade in" style="display:none;">
        <a data-dismiss="alert" class="close">x</a>
        <h4 class="alert-heading"><%= translate("ohSnap") %></h4>
        <p></p>
    </div>
    <div class="span9 columns">
        <form class="form-horizontal">
            <fieldset>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label"><%= translate("username") %>:</label>
                        <div class="controls">
                            <input type="text" value="" id="username-input" class="input-xlarge focused" tabindex="1">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><%= translate("password") %>:</label>
                        <div class="controls">
                            <input type="password" id="password-input" class="input-xlarge focused" tabindex="2" />
                        </div>
                    </div>
                    <div class="form-actions">
                        <button id="loginBtn" class="btn green-btn"><%= translate("login") %></button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
    <div class="span2 columns sidebar">
        <h3><%= translate("registration") %></h3>
        <p><%= translate("dontHaveNanotrader") %></p>
        <p><a id="showRegistrationBtn"><%= translate("createOneNow") %></a></p>
    </div>
</div>
