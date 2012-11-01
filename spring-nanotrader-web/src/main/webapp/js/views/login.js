/**
 * View Class for the Login
 * @author Carlos Soto <carlos.soto>
 */
nano.views.Login = Backbone.View.extend({

    /**
     * Bind the events functions to the different HTML elements
     */
    events: {
        'click #loginBtn' : 'login',
        'click #showRegistrationBtn' : 'registration'
    },

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto>
     * @param Object options
     * @return void
     */
    initialize: function (options) {
        'use strict';
        nano.containers.login = this.$el;
    },

    /**
     * Renders the Login View
     * @author Carlos Soto <carlos.soto>
     * @param mixed errorKey: Name of an error key from nano.strings to be displayed. It can be null (no error show on render)
     * @return void
     */
     render: function (errorKey) {
        'use strict';
        var loginError;
        if (!this.$el.html()) {
            this.$el.html(_.template( nano.utils.getTemplate(nano.conf.tpls.login) )());
            if (errorKey) {
                loginError = this.$('#login-error');
                loginError.find('p').html(translate(errorKey));
                loginError.show();
            }
        }
        this.$el.show();
    },

    /**
     * Registration event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    registration: function () {
        'use strict';
        window.location = nano.conf.hash.registration;
    },

    /**
     * Login event
     * @author Carlos Soto <carlos.soto>
     * @return void
     */
    login: function (event) {
        'use strict';
        event.preventDefault();
        // Cache the login and password controls for performance
        var loginControl = this.$('#login-control'),
            passwordControl = this.$('#password-control'),
            loginError = this.$('#login-error'),
            username = this.$('#username-input').val(),
            password = this.$('#password-input').val(),
            view = this;
        nano.utils.login (username, password, {
            success : function (jqXHR, textStatus) {
                //Clear the credentials from the inputs
                view.$('#username-input').val('');
                view.$('#password-input').val('');

                //Clear any previous error
                loginError.hide();
                loginControl.removeClass('error');
                passwordControl.removeClass('error');

                //Show the loading page, hide the login page and render the dashboard
                nano.instances.router.navigate( nano.conf.hash.dashboard );
            },
            error : function (jqXHR, textStatus, errorThrown) {
                loginError.show();
                switch (jqXHR.status) {
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
