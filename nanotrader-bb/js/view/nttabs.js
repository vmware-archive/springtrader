window.TabView = Backbone.View.extend({

    tagName: "div",

    initialize:function (activetab) {
        var variables = { isHomeActive : "inactive", isPortfolio : "inactive", 
                          isTradeActive: "inactive", isProfileActive: "inactive" };
        
        if (activetab.name    === 'home') {
            variables.isHomeActive="active";
        } else if (activetab.name === 'profile') {
            variables.isProfileActive="active";
        }
        this.template = _.template(tpl.get('tabs'), variables);
    },

    render:function () {
        $(this.el).html(this.template);
        return this;
    },
});