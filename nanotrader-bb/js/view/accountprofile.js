window.AccountProfileView = Backbone.View.extend({
    
    tagName: "div",
    
    events: {
        "submit #profileForm" : "handleForm"
    },
    
    initialize:function () {
        this.template = _.template(tpl.get('accountprofile'));
        this.template.isProfileActive = true;
        this.model = new AccountProfile();        
    },
    
    handleForm: function(data) {
        this.model.set({
            fullname:$("#fullname").val(),
            email:$("#email").val(),
            password:$('#password').val(),
            password_confirm:$('#password_confirm').val(),
            username:$('#username').val(),
            address:$("#address").val(),
            creditcard:$("#creditcard").val(),
            id:$('#id').val()
        });
        this.model.save();
    },

    render: function(myid) {
        var ap = new AccountProfile({id: myid});
        var type = ap.toJSON();
        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                //something
            },
            invalid: function(view, attr, error) {
                alert("ERROR : " + error );
            }
        });
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
})
