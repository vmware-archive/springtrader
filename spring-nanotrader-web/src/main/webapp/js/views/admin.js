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
        'click #help' : 'help',
        'keypress [type=number]' : 'checkEnter',
        'click #killTCServerBtn' : 'killTCServer',
        'click #crashTCServerBtn' : 'crashTCServer',
        'click #killSqlFireBtn'  : 'killSqlFireServer',
        'click #killRabbitMQBtn' : 'killRabbitMQ',
        'click #stopRabbitMQBtn' : 'stopRabbitMQ'
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
        if(nano.session.username!="admin")
    	{
    	$('#tabs-admin').remove();
    	$('#tabs-header').remove();
    	}      	
    else
    	{
    	$('#tabs-admin').show();
    	$('#tabs-header').show();
    	}
    },

    checkEnter : function(event) {
        if (event.which == 13) {
          $('#setUsersBtn').trigger('click');
          return true;
        }
        else {
          return nano.utils.validateNumber(event);
        }
    },

    validateNumber : function(event){
      return nano.utils.validateNumber(event);
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

    /**
     * Kill TCServer
     * @return void
     */
    killTCServer : function (event){
        event.preventDefault();
        nano.utils.killTCServer({
            success : function(){
            },
            error : function() {}
            });
    },

    /**
     * crash TCServer
     * @return void
     */
    crashTCServer : function (event){
        event.preventDefault();
        nano.utils.crashTCServer({
            success : function(){
            },
            error : function() {
            }
            });
    },

    /**
     * Kill SQLFire
     * @return void
     */
    killSqlFireServer : function (event){
        event.preventDefault();
        nano.utils.killSqlFireServer();
    },
    
    /**
     * Kill RabbitMQ
     * @return void
     */
    killRabbitMQ : function (event){
        /*
        event.preventDefault();
        nano.utils.killRabbitMQ({
            success : function(jqXHR, textStatus){
            },
            error : function(jqXHR, textStatus, errorThrown) {
            }
            });*/
    },

    /**
     * Stop RabbitMQ
     * @return void
     */
    stopRabbitMQ : function (event){
        /*
        event.preventDefault();
        nano.utils.setUsers(count, {
            success : function(jqXHR, textStatus){
            },
            error : function(jqXHR, textStatus, errorThrown) {
            }
            });*/
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
