OrderListView = Backbone.View.extend({

    tagName:'table',

    initialize:function (accountid) {
        this.template = _.template(tpl.get('order-list'));
        this.orders = new OrderCollection();
        this.orders.url = 'spring-nanotrader-services/api/account/' + accountid + '/order';
        this.orders.bind('add', this.render, this);
        this.orders.fetch();     
        
    },

    render:function (event) {
        $(this.el).html(this.template);
        _.each(this.orders.models, function (order) {
            var orderView = new OrderView(order);
            var orderRenderContent = orderView.render().el;
            $(this.el).append(orderRenderContent);
        }, this);
        return this;
    }
});

OrderView = Backbone.View.extend({

    tagName:"tr",

    initialize:function (order) {
        this.template = _.template(tpl.get('order-row'));
        this.model = order;
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});