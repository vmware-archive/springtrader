LoginView = Backbone.View.extend({
    
    tagName: "div",
    
    events: {
        "submit #loginForm" : "handleForm",
        "click button"     : "register"
    },
    
    initialize:function () {
        this.template = _.template(tpl.get('login'));
        this.template.isProfileActive = true;
    },
    
    handleForm: function(data) {
    },

    register: function(data) {
        alert('register')
    },

    render: function() {

        $(this.el).html(this.template);
        
        return this;
    }
})