/**
 * View class for Admin
 * @author Kashyap Parikh
 */
nano.views.Admin = Backbone.View.extend({
    
    /**
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #setUsersBtn' : 'setUsers',
        'click #profile' : 'profile',
        'click #overview' : 'overview',
        'click #help' : 'help'
    },
    
    /**
     * Class constructor
     * @param Object options:
     * - el: selector for the container
     * @return void
     */
    initialize : function(options) {
        nano.containers.admin = this.$el;
    },

    /**
     * Renders the Admin View
     * @param Object orders: Instance of nano.models.Orders
     * @return void
     */
    render: function(errorKey) {

        if ( !this.$el.html() )
        {
            this.$el.html(_.template(nano.utils.getTemplate(nano.conf.tpls.admin))());
        }
        if (errorKey)
        {
             var adminError = this.$('#admin-error');
             adminError.find('p').html(translate(errorKey));
             adminError.removeClass('hide');
        }
        this.$el.show();
    },
    
    /**
     * Send user count to server
     * @return void
     */
    setUsers : function (event){
        event.preventDefault();
        this.$('#setUsersBtn').attr("disabled", "disabled");
        var count = this.$('#user-count').val();
        var adminError = this.$('#admin-error');
        nano.utils.setUsers(count, {
            success : function(jqXHR, textStatus){
                //handle success in nano.utils.setUsers
            },
            error : function(jqXHR, textStatus, errorThrown) {
                adminError.find('p').html(translate('unknowError'));
                adminError.removeClass('hide');
            }
            });
    },

    profile : function(){
        window.location = nano.conf.hash.profile;
    },

    overview : function(){
        window.location = nano.conf.hash.overview;
    },
    
    help : function(){
        window.location = nano.conf.hash.help;
    }
    
});
