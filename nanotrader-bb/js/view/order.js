OrderListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function (myuserid) {
        this.model = new OrderCollection();
        this.model.findMyOrders(myuserid);
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (order) {
            $(self.el).append(new OrderListItemView({model:order}).render().el);
        });
    },

    render:function (eventName) {
        this.template = _.template(tpl.get('order-list'));
        $(this.el).html(this.template);
        _.each(this.model.models, function (order) {
            $(this.el).append(new OrderListItemView({model:order}).render().el);
        }, this);
        return this;
    }
});

OrderListItemView = Backbone.View.extend({

    tagName:"tr",

    initialize:function () {
        this.template = _.template(tpl.get('order-row'));
        this.model.bind("change", this.render, this);
        //this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});