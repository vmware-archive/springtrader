window.AccountProfileView = Backbone.View.extend({

    tagName : "div",

    events : {
        "submit #profileForm" : "handleForm",
        "change input" : "changed"
    },
    changed : function(evt) {
        var changed = evt.currentTarget;
        var value = $("#" + changed.id).val();
        var obj = "{\"" + changed.id + "\":\"" + value + "\"}";
        var objInst = JSON.parse(obj);
        this.model.set(objInst);

    },
    initialize : function(myid) {
        _.bindAll(this, "changed");
        this.template = _.template(tpl.get('accountprofile'));
        this.template.isProfileActive = true;
        this.model = new AccountProfile({
            profileid : myid
        });
        this.model.bind('change', this.render, this);
        Backbone.Validation.bind(this, {
            valid : function(view, attr) {
                //something
            },
            invalid : function(view, attr, error) {
                alert("ERROR : " + error);
                $('#'+ attr).focus();
            }
        });
        this.model.fetch({
            success: function() {
                console.log("account profile fetch successful");
            },
            error: function() {
                console.log("account profile fetch failed, go to login page");
                app.navigate('/login',  {trigger: true});
            }
        }); 
    },
    handleForm : function(data) {
        this.model.unset('accounts', {
            silent : true
        });
        this.model.unset('password_confirm', {
            silent : true
        });
        this.model.save(undefined, {
            success : function(model, resp) {
                console.log("model saved");
                $('#result').append('<div id="showsuccess"<b> Success! </b></div>');
                $('#showsuccess').fadeOut(5000, function() {
                    $('#showsuccess').remove();
                });
            },
            error : function(model, resp) {
                console.log("unable to save model");
                $('#result').append('Failed! ' + resp );
            }
        });
    },
    render : function() {
        var changedAttr = this.model.changedAttributes();
        var changeCounter = 0;
        for(i in changedAttr) {
            changeCounter++;
            if(changeCounter > 1)
                break;
        }
        if(changeCounter === 1)
            return;

        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})