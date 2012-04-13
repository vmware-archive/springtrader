<div class="row clearfix">
    <div class="span2 columns sidebar">
        <div class="profile-header">
            <h3>Svetlana Agafonova</h3>
            <p>svetlanka.ua@gmail.com</p>
        </div>
            <ul class="nav nav-tabs nav-stacked">
                <li class="active"><a href="profile.html"><%= translate("profile") %></a></li>
                <li><a href="help.html"><%= translate("help") %></a></li>
            </ul>
    </div>
    <div class="span9 columns">
        <form class="form-horizontal">
            <fieldset>
                <h3><%= translate("accountProfile") %></h3>
                    <div class="span4">
                        <div id="fullname-control" class="control-group">
                            <label for="fullname-input" class="control-label"><%= translate("fullName") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="fullname-input" class="input-xlarge focused">
                            </div>
                        </div>
                        <div id="username-control" class="control-group">
                            <label for="username-input" class="control-label"><%= translate("username") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="username-input" class="input-xlarge focused">
                            </div>
                        </div>
                        <div id="password-control" class="control-group">
                            <label for="password-input" class="control-label"><%= translate("newPassword") %>:</label>
                            <div class="controls">
                                <input type="password" value="" id="password-input" class="input-xlarge focused">  
                            </div>
                        </div>
                        <div id="matchpasswd-control" class="control-group error">
                            <label for="matchpasswd-input" class="control-label"><%= translate("passwordConfirmation") %>:</label>
                            <div class="controls">
                                <input type="password" id="matchpasswd-input" class="input-xlarge focused"><br/>
                                <span class="help-inline"><%= translate("passwordMatching") %></span>
                            </div>
                        </div>
                    </div>
                    <div class="span4">
                        <div id="email-control" class="control-group">
                            <label for="email-input" class="control-label"><%= translate("email") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="email-input" class="input-xlarge focused">
                            </div>
                        </div>
                        <div id="creditcard-control" class="control-group">
                            <label for="creditcard-input" class="control-label"><%= translate("creditCardNumber") %>:</label>
                            <div class="controls">
                                <input type="text" value="" id="creditcard-input" class="input-xlarge focused">
                            </div>
                        </div>
                        <div id="address-control" class="control-group">
                            <label for="address-input" class="control-label"><%= translate("address") %>:</label>
                            <div class="controls">
                                <textarea rows="3" id="address-input" class="input-xlarge"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button id="updateBtn" class="btn green-btn"><%= translate("update") %></button>
                    </div>
            </fieldset>
        </form>
        <p><img src="custom/images/bg-corner.png" alt="" class="corner" /></p>
    </div>
</div>

