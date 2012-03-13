RecentOrdersView = Backbone.View.extend({
    tagName : 'div',
    initialize : function() {
        this.template = _.template(tpl.get('recent-orders'));
    },
    render : function(eventName) {
        // Recent Orders functionality not implemented yet
        // var recentorders = new Orders();
        // $(this.el).html(this.template(recentorders.toJSON()));
        $(this.el).append(this.template);
        return this;
    }
});

TradeView = Backbone.View
        .extend({
            tagName : 'div',
            initialize : function() {
                this.template = _.template(tpl.get('trade'));
            },

            render : function(eventName) {
                var userid = 30;  //FIX_ME!  Needs to come from the app level
                $(this.el).html(this.template());
                $('#quote', this.el).append(new FullQuoteView().render().el);
                
                $('#recent-orders', this.el).append(
                        new OrderListView(userid).render().el);
                return this;
            }

        });
