<div class="row clearfix">
        <div class="span9 columns">
            <form class="form-horizontal">
                <fieldset>
                    <h3><%= translate("login") %><span><%= translate("enterUsername") %></span></h3>
                    <div id="login-error" class="span8 alert alert-block alert-error fade in" style="display:none;">
                        <a data-dismiss="alert" class="close">x</a>
                        <h4 class="alert-heading"><%= translate("ohSnap") %></h4>
                        <p></p>
                    </div>
                    <div class="span4">
                        <div id="login-control" class="control-group">
                            <label for="username-input" class="control-label"><%= translate("username") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="username-input" class="input-xlarge focused" tabindex="1">
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div id="password-control" class="password control-group">
                            <label for="password-input" class="control-label"><%= translate("password") %>:</label>
                            <div class="controls"><input type="password" id="password-input" class="input-xlarge focused" tabindex="2" /></div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button id="loginBtn" class="btn green-btn"><%= translate("login") %></button>
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
</div>
