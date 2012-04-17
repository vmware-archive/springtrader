<div class="row clearfix">
    <div class="span9 columns">
        <form class="form-horizontal">
            <fieldset>
                <h3><%= translate("contactUs") %></h3>
                <div id="contact-error" class="hide span8 alert alert-block alert-error fade in">
                    <a data-dismiss="alert" class="close">x</a>
                    <h4 class="alert-heading"><%= translate("ohSnap") %></h4>
                    <p></p>
                </div>
                <div class="control-group">
                    <label for="name-input" class="control-label"><%= translate("name") %></h3>:</label>
                    <div class="controls">
                        <input type="text" value="" id="name-input" class="input-xlarge focused">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label"><%= translate("email") %></h3>:</label>
                    <div class="controls">
                        <input type="text" value="" id="email-input" class="input-xlarge focused">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label"><%= translate("phone") %>:</label>
                    <div class="controls">
                        <input type="text" value="" id="phone-input" class="input-xlarge focused">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label"><%= translate("message") %>:</label>
                    <div class="controls">
                        <textarea rows="3" id="message-input" class="input-xlarge"></textarea>
                    </div>
                </div>
                <div class="form-actions">
                    <button id="sendBtn" class="btn green-btn"><%= translate("send") %></button>
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
