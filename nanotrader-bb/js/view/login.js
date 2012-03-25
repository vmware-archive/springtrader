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
        if (this.model.get('API_TOKEN')) { 
            this.model.unset('API_TOKEN', {
                silent : true
            });
            this.model.unset('accountid', {
                silent : true
            });
        }
        this.model.save(undefined, { async : false,
            success : function(model, resp) {
                console.log("model saved : token = " + resp.authToken);
                $.cookie('API_TOKEN', resp.authToken);
                $.cookie('accountid', resp.accountid);
                app.navigate('dashboard/' + resp.accountid,  {trigger: true});
            },
            error : function() {
                console.log("login failed!");
                app.navigate('login',  {trigger: true});
            }
        });
    },
    render: function() {
        $(this.el).html(this.template);       
        return this;
    }
})