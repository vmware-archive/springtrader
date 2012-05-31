<div class="row clearfix">
        <div class="span9 columns">
            <form class="form-horizontal">
                <fieldset>
                    <h3><%= translate("registerUserName") %><span><%= translate("enterAccountDetails") %></span></h3>
                    <div id="registration-error" class="hide span8 alert alert-block alert-error fade in">
                        <a data-dismiss="alert" class="close">x</a>
                        <h4 class="alert-heading"></h4>
                        <p></p>
                    </div>
                    <div class="span4">
                        <div id="fullname-control" class="control-group">
                            <label for="fullname-input" class="control-label"><%= translate("fullName") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="fullname-input" class="input-xlarge focused"><br/>
                                <span id="fullnameError" class="help-inline hide"><%= translate("fullnameError") %></span>
                            </div>
                        </div>
                        <div id="email-control" class="control-group">
                            <label class="control-label"><%= translate("email") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="email-input" class="input-xlarge focused"><br/>
                                <span id="emailError" class="help-inline hide"><%= translate("emailError") %></span>
                            </div>
                        </div>
                        <div id="password-control" class="control-group">
                            <label class="control-label"><%= translate("password") %>:</label>
                            <div class="controls">
                                <input type="password" value="" id="reg-password-input" class="input-xlarge focused"><br/>
                                <span id="passwdError" class="help-inline hide"><%= translate("passwdError") %></span>
                            </div>
                        </div>
                        <div id="matchpasswd-control" class="control-group">
                            <label for="matchpasswd-input" class="control-label"><%= translate("passwordConfirmation") %>:</label>
                            <div class="controls">
                                <input type="password" id="matchpasswd-input" class="input-xlarge focused"><br/>
                                <span id="matchpasswd-error" class="help-inline hide"><%= translate("passwordMatching") %></span>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div id="username-control" class="control-group">
                            <label for="reg-username-input" class="control-label"><%= translate("username") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="reg-username-input" class="input-xlarge focused"><br/>
                                <span id="usernameError" class="help-inline hide"><%= translate("usernameError") %></span>
                            </div>
                        </div>
                        <div id="openbalance-control" class="control-group">
                            <label class="control-label"><%= translate("openingBalance") %>:</label>
                            <div class="controls">
                                <input type="number" value="" id="openbalance-input" class="input-xlarge focused"><br/>
                                <span id="openbalanceError" class="help-inline hide"><%= translate("openbalanceError") %></span>
                            </div>
                        </div>
                        <div id="creditcard-control" class="control-group">
                            <label class="control-label"><%= translate("creditCardNumber") %>:</label>
                            <div class="controls">
                                <input type="number" value="" id="creditcard-input" class="input-xlarge focused" maxlength="16"><br/>
                                <span id="creditcardError" class="help-inline hide"><%= translate("creditcardError") %></span>
                            </div>
                        </div>
                        <div id="address-control" class="control-group">
                            <label class="control-label"><%= translate("address") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="address-input" class="input-xlarge focused"><br/>
                                <span id="addressError" class="help-inline hide"><%= translate("addressError") %></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button id="registrationBtn" class="btn green-btn"><%= translate("register") %></button>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="span2 columns sidebar">
            <h3><%= translate("nanoTraderLogin") %></h3>
            <p><%= translate("alreadyRegistered") %></p>
            <p><a id="showLoginBtn"><%= translate("visitLoginPage") %></a></p>
        </div>
    </div>
</div>
