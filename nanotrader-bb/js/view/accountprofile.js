window.AccountProfileView = Backbone.View.extend({
    
    tagName: "div",
    
    initialize:function () {
        this.template = _.template(tpl.get('accountprofile'));
        this.template.isProfileActive = true;
    },

    render: function() {
        //Backbone.Validation.bind(this);
        var ap = new AccountProfile();
        $(this.el).html(this.template(ap.toJSON()));
        return this;
    }
})
