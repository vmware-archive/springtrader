TradeView = Backbone.View
        .extend({
            tagName : 'div',
            initialize : function() {
                this.template = _.template(tpl.get('trade'));
            },

            render : function(eventName) {
                var accountid = 30;  //FIX_ME!  Needs to come from the app level
                $(this.el).html(this.template());
                $('#quote', this.el).append(new FullQuoteView().render().el);
                
                $('#recent-orders', this.el).append(new OrderListView(accountid).el);
                return this;
            }
});