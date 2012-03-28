Order = Backbone.Model.extend({
    initialize : function() {
      this.idAttribute = 'orderid';  
    }

});

OrderCollection = Backbone.Collection.extend({

    model : Order,
    parse : function(response) {
        _.each(response, function(model) {
                    this.add(model);
                }, this);
    }
});
