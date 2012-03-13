window.TabView = Backbone.View.extend({

    tagName: "div",

    initialize:function (activetab) {
        var variables = { isHomeActive : "inactive", isPortfolioActive : "inactive", 
                          isTradeActive: "inactive", isProfileActive: "inactive" };
        
        if (activetab.name    === 'home') {
            variables.isHomeActive="active";
        } else if (activetab.name === 'profile') {
            variables.isProfileActive="active";
        } else if (activetab.name === 'trade') {
            variables.isTradeActive="trade";
        } else if (activetab.name === 'portfolio') {
            variables.isPortfolioActive="active";
        }
        this.template = _.template(tpl.get('tabs'), variables);
    },

    render:function () {
        $(this.el).html(this.template);
        return this;
    }
});