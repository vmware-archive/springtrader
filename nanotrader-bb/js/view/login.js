LoginView = Backbone.View.extend({
    
    tagName: "div",
    
    events: {
        "submit #loginForm" : "handleForm",
        "change input" : "changed"
    },
    changed : function(evt) {
        var changed = evt.currentTarget;
        var value = $("#" + changed.id).val();
        var obj = "{\"" + changed.id + "\":\"" + value + "\"}";
        var objInst = JSON.parse(obj);
        this.model.set(objInst);

    },
    initialize: function () {
        this.template = _.template(tpl.get('login'));
        this.model = new Login();
    },
    
    handleForm : function() {
        this.model.unset('API_TOKEN', {
            silent : true
        });
        this.model.unset('authToken', {
            silent : true
        });
        this.model.unset('accountid', {
            silent : true
        });
        var acctid = null;
        this.model.save(undefined, { wait: true,  
            success : function(model, resp) {
                console.log("model saved : token = " + resp.authToken);
                $.cookie('API_TOKEN', resp.authToken);
                $.cookie('accountid', resp.accountid);
                 acctid = resp.accountid;
            },
            error : function() {
                console.log("login failed!");
            }
        });
        // TBD: Why {wait:true} on save is not working? Shuold use model to get 
        // attributes instead of resp
        app.navigate('/accountprofile/' + acctid,  {trigger: true});
    },
    render: function() {
        $(this.el).html(this.template);       
        return this;
    }
})