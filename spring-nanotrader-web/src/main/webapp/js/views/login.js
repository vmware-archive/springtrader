/**
 * View Class for the Login
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Login = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #loginBtn' : 'login',
        'click #showRegistrationBtn' : 'registration'
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
     * Renders the Login View
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
                    var loginError = this.$('#login-error');
                    loginError.find('p').html(translate(errorKey));
                    loginError.show();
                }
            }
            this.$el.show();
    },

    /**
     * Registration event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    registration : function() {
        window.location = nano.conf.hash.registration;
    },

    /**
     * Login event
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    login : function(event){

        // Cache the login and password controls for performance
        var loginControl = this.$('#login-control');
        var passwordControl = this.$('#password-control');
        var loginError = this.$('#login-error');

        //loginError.show();
        //loginControl.removeClass('error');
        //passwordControl.removeClass('error');

        event.preventDefault();
        var username = this.$('#username-input').val();
        var password = this.$('#password-input').val();
        var view = this;
        nano.utils.login(username, password, {
            success : function(jqXHR, textStatus){

                //Clear the credentials from the inputs
                view.$('#username-input').val('');
                view.$('#password-input').val('');

                //Show the loading page, hide the login page and render the dashboard
                nano.utils.goTo( nano.conf.hash.dashboard );
            },
            error : function(jqXHR, textStatus, errorThrown) {
                loginError.show();
                switch(jqXHR.status) {
                    case 401:
                        loginControl.addClass('error');
                        passwordControl.addClass('error');
                        loginError.find('p').html(translate('invalidUser'));
                        break;
                    default:
                        loginError.find('p').html(translate('unknowError'));
                        break;
                }
            }
        });
    }
});
