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

                $(this.el).html(this.template());
                $('#quote', this.el).append(new FullQuoteView().render().el);

                // NOT YET IMPLEMENTED: recent orders data
                $('#recent-orders', this.el).append(
                        new RecentOrdersView().render().el);
                return this;
            }

        });