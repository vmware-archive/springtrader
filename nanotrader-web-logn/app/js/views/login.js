/**
 * View Class for the Login
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Login = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #loginBtn' : 'login'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.login = this.$el;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.login)),

    /**
     * Renders the Account Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
     render: function(errorKey) {
            if ( !this.$el.html() )
            {
                var login = this.template();
                this.$el.html(login);
                if (errorKey)
                {
                    var loginError = this.$el.find('#login-error');
                    loginError.find('p').html(translate(errorKey));
                    loginError.removeClass('hide');
                }
            }
            this.$el.show();
    },

    /**
     * Login event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    login : function(event){

        // Cache the login and password controls for performance
        var loginControl = this.$el.find('#login-control');
        var passwordControl = this.$el.find('#password-control');
        var loginError = this.$el.find('#login-error');

        loginError.addClass('hide');
        loginControl.removeClass('error');
        passwordControl.removeClass('error');

        event.preventDefault();
        var username = this.$el.find('#username-input').val();
        var password = this.$el.find('#password-input').val();
        var view = this;
        nano.utils.login(username, password, {
            success : function(jqXHR, textStatus){

                //Clear the credentials from the inputs
                view.$el.find('#username-input').val('');
                view.$el.find('#password-input').val('');

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
    }
});