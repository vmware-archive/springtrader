<div class="row clearfix">
    <div class="span2 columns sidebar">
        <div>
            <h3><%= fullname %></h3>
            <p><%= email %></p>
        </div>
        <ul class="nav nav-tabs nav-stacked">
            <li class="active"><a id="profile"><%= translate("profile") %></a></li>
            <li><a id="overview"><%= translate("applicationOverview") %></a></li>
            <li><a id="admin"><%= translate("admin") %></a></li>
            <li><a id="help"><%= translate("help") %></a></li>
        </ul>
    </div>
    <div class="span9 columns">
        <form class="form-horizontal">
            <fieldset>
                <h3><%= translate("accountProfile") %></h3>
                <div id="update-error" class="hide span8 alert alert-block alert-error fade in">
                    <a data-dismiss="alert" class="close">x</a>
                    <h4 class="alert-heading"></h4>
                    <p></p>
                </div>
                <div class="span4">
                    <div id="fullname-control" class="control-group">
                        <label for="fullname-input" class="control-label"><%= translate("fullName") %>:</label>
                        <div class="controls">
                            <input type="text" value="<%= fullname %>" id="fullname-input" class="input-xlarge focused"><br/>
                            <span id="fullnameError" class="help-inline hide"><%= translate("fullnameError") %></span>
                        </div>
                    </div>
                    <div id="username-control" class="control-group">
                        <label for="username-input" class="control-label"><%= translate("username") %>:</label>
                        <div class="controls">
                            <input type="text" value="<%= userid %>" id="username-input" class="input-xlarge focused"><br/>
                            <span id="usernameError" class="help-inline hide"><%= translate("usernameError") %></span>
                        </div>
                    </div>
                    <div id="password-control" class="control-group">
                        <label for="password-input" class="control-label"><%= translate("newPassword") %>:</label>
                        <div class="controls">
                            <input type="password" value="" id="password-input" class="input-xlarge focused"><br/>
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
                    <div id="email-control" class="control-group">
                        <label for="email-input" class="control-label"><%= translate("email") %>:</label>
                        <div class="controls">
                            <input type="text" value="<%= email %>" id="email-input" class="input-xlarge focused"><br/>
                            <span id="emailError" class="help-inline hide"><%= translate("emailError") %></span>
                        </div>
                    </div>
                    <div id="creditcard-control" class="control-group">
                        <label for="creditcard-input" class="control-label"><%= translate("creditCardNumber") %>:</label>
                        <div class="controls">
                            <input type="text" value="<%= creditcard %>" id="creditcard-input" class="input-xlarge focused"><br/>
                            <span id="creditcardError" class="help-inline hide"><%= translate("creditcardError") %></span>
                        </div>
                    </div>
                    <div id="address-control" class="control-group">
                        <label for="address-input" class="control-label"><%= translate("address") %>:</label>
                        <div class="controls">
                            <textarea rows="3" id="address-input" class="input-xlarge"><%= address %></textarea><br/>
                            <span id="addressError" class="help-inline hide"><%= translate("addressError") %></span>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button id="updateBtn" class="btn green-btn"><%= translate("update") %></button>
                </div>
            </fieldset>
        </form>
        <!--<p><img src="custom/images/bg-corner.png" alt="" class="corner" /></p>-->
    </div>
</div>

