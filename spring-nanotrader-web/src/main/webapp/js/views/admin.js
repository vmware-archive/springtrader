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
     * Templating function (injects data into an HTML Template)
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.admin)),
    
    /**
     * Renders the Admin View
     * @param Object orders: Instance of nano.models.Orders
     * @return void
     */
    render: function(errorKey) {
        
        this.$el.html(this.template());
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
        var count = this.$('#user-count').val();
        var adminError = this.$('#admin-error');
        nano.utils.setUsers(count, {
            success : function(jqXHR, textStatus){
                //User should be logged out on success
            },
            error : function(jqXHR, textStatus, errorThrown) {
                adminError.find('p').html(translate('unknowError'));
                adminError.removeClass('hide');
            }
            });
    }
    
});
