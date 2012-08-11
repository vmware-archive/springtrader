/**
 * View class for Admin
 * @author Kashyap Parikh
 * @author Ilayaperumal Gopinathan
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
        'click #stopRabbitMQBtn' : 'stopRabbitMQ',
        'click #hypericonnect'   : 'connectHyperic',
        'click .control-actions' : 'controlActions',
        'click #perf-next'  : 'perfNext',
        'click #perf-action' : 'perfAction'
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
    
    /*
     * Connect Hyperic Server
     */
    connectHyperic : function (){
    	var host = this.$('#hyperic-host').val();
    	var user = this.$('#hyperic-user').val();
    	var pwd = this.$('#hyperic-pwd').val();
    	var hqPage = this.$el.find('#hq-interface').html(_.template(nano.utils.getTemplate(nano.conf.tpls.vfabricServers)));
    	var rows = this.$('#list-of-servers > tbody').html('');
    	var servers;
    	$.ajax({
            url : "/vfabric-hqapi-services/hqapi/vfabric-servers/list",
            type : 'POST',
            headers : nano.utils.getHttpHeaders(),
            dataType : 'json',
            timeout: 10000,
            data : JSON.stringify({
                host : host,
                user : user,
                pwd : pwd
            }),
            success : function(data, textStatus, jqXHR){
               servers = data.servers;         
           	   $.each(servers, function(i, val){
            	   rows.append(_.template(nano.utils.getTemplate(nano.conf.tpls.vfabricServerRow))(val));
            	   var actionColumn = $('#list-of-servers tr td#'+val.id);
            	   for (j=0; j< val.actionSize; j++){
            		   actionColumn.append("<button id=\""+ val.id + "_" + val["action"+j] +"\" class=\"btn btn-inverse control-actions\">"+ val["action"+j] +"</button>");
            	   }
               });
               hqPage.show();
            },
            error : function(data, textStatus, jqXHR){
            	if (textStatus == "timeout") {
            		alert("Connection to Hyperic timed out")
            	} else {
            		nano.utils.onApiError;
            	}
            }
        });
    	this.$('#hyperic-host').val('');
    	this.$('#hyperic-user').val('');
    	this.$('#hyperic-pwd').val('');
    },
    
    controlActions : function (event){
    	var host = this.$('#hyperic-host').val();
    	var user = this.$('#hyperic-user').val();
    	var pwd = this.$('#hyperic-pwd').val();
    	var buttonId = event.target.id;
    	var index = buttonId.indexOf('_');
    	var resourceId = buttonId.substring(0,index);
    	var action = buttonId.substring(index+1);
    	$.ajax({
            url : "/vfabric-hqapi-services/hqapi/controlaction",
            type : 'POST',
            headers : nano.utils.getHttpHeaders(),
            dataType : 'json',
            data : JSON.stringify({
                resourceId : resourceId,
                action : action,
                host : host,
                user : user,
                pwd : pwd
            }),
            success : function(data, textStatus, jqXHR){
            	alert('Control Action: '+ action + ' executed successfully');
            },
            error : function(data, textStatus, jqXHR){
            	if (textStatus == "timeout") {
            		alert("Connection to Hyperic timed out")
            	} else {
            		nano.utils.onApiError;
            	}
            }
        });
    },
    
    perfNext : function(event) {
    	// Hide 'Next' button
    	$(event.target).hide();
    	// Create client VMs & credential form
    	var vms = this.$('#perf-vms').val();
    	this.$('#performance-testing > form').append("<div id=\"perf-formlabel\"><label> Enter client VMs and credentials " +
    			"(Make sure groovy is installed/updated via System PATH or .bash_profile) </label><p/></div>");
    	for (i=1; i<= vms; i++){
    		this.$('#performance-testing > form').append("<input class=\"span2\" id=\"perf-vmname"+i+"\" type=\"text\" placeholder=\"Client VM "+ i + "\" />");
    		this.$('#performance-testing > form').append("<input class=\"span2\" id=\"perf-vmuser"+i+"\" type=\"text\" placeholder=\"UserName\" />");
    		this.$('#performance-testing > form').append("<input class=\"span2\" id=\"perf-vmpwd"+i+"\" type=\"password\" placeholder=\"Password\" />");
    		this.$('#performance-testing > form').append(" <input id=\"perf-installopt"+i+"\" type=\"checkbox\" value=\"re-install\"  /> " +
    				"<label for=\"perf-installopt"+i+"\">Re-install/first-time install perf code</label>");
    	}
    	this.$('#performance-testing > form').append("<p/><input id=\"perf-action\" class=\"btn btn-inverse\" type=\"button\" value=\"Run Test\" />");
    	//this.$('#performance-testing').show();
    },
    
    perfAction : function(event) {
    	var users = this.$('#perf-users').val();
    	var vms = this.$('#perf-vms').val();
    	var db = this.$('#perf-db').val();
    	var vmnames = new Array();
    	var usernames = new Array();
    	var passwords = new Array();
    	var installopts = new Array();
    	for (i=1; i<=vms; i++){
           vmnames[i-1] = this.$('#perf-vmname'+i).val();
           usernames[i-1] = this.$('#perf-vmuser'+i).val();
           passwords[i-1] = this.$('#perf-vmpwd'+i).val();
           installopts[i-1] = this.$('#perf-installopt'+i).is(':checked');
    	}
    	$.ajax({
            url : nano.conf.urls.perfTest,
            type : 'POST',
            headers : nano.utils.getHttpHeaders(),
            dataType : 'json',
            data : JSON.stringify({
                usercount : users,
                vmcount : vms,
                db : db,
                vmnames : vmnames,
                usernames : usernames,
                passwords : passwords,
                installopts : installopts
            }),
            success : function(data, textStatus, jqXHR){
            	alert('Started running the scripts on the VMs')
            },
            error : nano.utils.onApiError
        });
        this.$('#perf-users').val('');
    	this.$('#perf-vms').val('');
    	this.$('#perf-formlabel').hide();
    	for (i=1; i<=vms; i++){
            this.$('#perf-vmname'+i).hide();
            this.$('#perf-vmuser'+i).hide();
            this.$('#perf-vmpwd'+i).hide();
            this.$('#perf-installopt'+i).hide();
            this.$("#performance-testing > form label[for=\'perf-installopt"+i+"\']").hide();
     	}
    	this.$('#perf-action').hide();
    	this.$('#perf-next').show();
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
