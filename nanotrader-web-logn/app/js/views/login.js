/**
 * HTML template for the Login Page
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
 nano.templates.login = '<div class="row clearfix">\
                            <div class="span9 columns">\
                                <form class="form-horizontal">\
                                    <fieldset>\
                                        <h3><%= translate("login") %><span><%= translate("enterUsername") %></span></h3>\
                                        <div id="login-error" class="hide span8 alert alert-block alert-error fade in">\
                                            <a data-dismiss="alert" class="close">x</a>\
                                            <h4 class="alert-heading"><%= translate("ohSnap") %></h4>\
                                            <p></p>\
                                        </div>\
                                        <div class="span4">\
                                            <div id="login-control" class="control-group">\
                                                <label for="username-input" class="control-label"><%= translate("username") %>:</label>\
                                                <div class="controls">\
                                                    <input type="text" value="" id="username-input" class="input-xlarge focused" tabindex="1">\
                                                    <label class="checkbox"><input id="remember-me" type="checkbox" tabindex="3" /> <%= translate("rememberMe") %></label>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="span4">\
                                            <div id="password-control" class="password control-group">\
                                                <label for="password-input" class="control-label"><%= translate("password") %>:</label>\
                                                <div class="controls"><input type="password" id="password-input" class="input-xlarge focused" tabindex="2" /></div>\
                                            </div>\
                                        </div>\
                                        <div class="form-actions">\
                                            <a class="forgot-password pull-left"><%= translate("forgotPassword") %></a>\
                                            <button id="loginBtn" class="btn green-btn"><%= translate("login") %></button>\
                                        </div>\
                                    </fieldset>\
                                </form>\
                            </div>\
                            <div class="span2 columns sidebar">\
                                <h3><%= translate("registration") %></h3>\
                                <p><%= translate("dontHaveNanotrader") %></p>\
                                <p><a><%= translate("pleaseRegister") %></a></p>\
                            </div>\
                        </div>\
                    </div>';


/**
 * View Class for the Login
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Login = function(element) {
    this.element = element;
    nano.containers.login = element;

    /**
     * Renders the Footer View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
    this.render = function(errorKey) {
        var that = this;

        // Render the login block only if it hasn't been rendered before.
        if ( !this.element.html() )
        {
            var login = _.template(nano.templates.login)({});
            that.element.html(login);

            var loginError = that.element.find('#login-error');
            if (errorKey)
            {
                loginError.find('p').html(translate(errorKey));
                loginError.removeClass('hide');
            }

            that.element.find('#loginBtn').click(function(event){

                // Cache the login and password controls for performance
                var loginControl = that.element.find('#login-control');
                var passwordControl = that.element.find('#password-control');

                loginError.addClass('hide');
                loginControl.removeClass('error');
                passwordControl.removeClass('error');

                event.preventDefault();
                var username = that.element.find('#username-input').val();
                var password = that.element.find('#password-input').val();
                nano.utils.login(username, password, {
                    success : function(jqXHR, textStatus){

                        //Clear the credentials from the inputs
                        that.element.find('#username-input').val('');
                        that.element.find('#password-input').val('');

                        //Show the loading page, hide the login page and render the dashboard
                        nano.instances.controller.renderDashboard();
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        switch(jqXHR.status) {
                            case 401:
                                loginControl.addClass('error');
                                passwordControl.addClass('error');
                                loginError.find('p').html(translate('invalidUser'));
                                loginError.removeClass('hide');
                                break;
                            default:
                                loginError.find('p').html(translate('unknowError'));
                                loginError.removeClass('hide');
                                break;
                        }
                    }
                });
            });
        }
        this.element.show();
    };
};
