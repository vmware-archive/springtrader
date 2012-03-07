window.AccountProfileView = Backbone.View.extend({

    tagName : "div",

    events : {
        "submit #profileForm" : "handleForm",
        "change input" :"changed"
    },
    changed:function(evt) {
        var changed = evt.currentTarget;
        var value = $("#"+changed.id).val();
        var obj = "{\""+changed.id +"\":\""+value+"\"}";
        var objInst = JSON.parse(obj);
        this.model.set(objInst);            
    },
    initialize : function(myid) {
        _.bindAll(this, "changed");
        this.template = _.template(tpl.get('accountprofile'));
        this.template.isProfileActive = true;
        this.model = new AccountProfile({
            id : myid
        });
    },
    handleForm : function(data) {
    //    this.model.set({
     //      fullname : $("#fullname").val()
      //  });
        this.model.unset('logincount');
        this.model.unset('logoutcount');
        this.model.unset('creationdate');
        this.model.unset('lastlogin');
        this.model.unset('openbalance');
        //this.model.unset('id');

        this.model.save(undefined, {url:'spring-nanotrader-services/api/accountProfile' });
    },
    render : function() {
        Backbone.Validation.bind(this, {
            valid : function(view, attr) {
                //something
            },
            invalid : function(view, attr, error) {
                alert("ERROR : " + error);
            }
        });
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})