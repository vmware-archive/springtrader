Order = Backbone.Model.extend({
    idAttribute : 'quoteid',
    // FIX_ME: needs userid 
    urlRoot : 'spring-nanotrader-services/api/order',

    initialize : function() {
    }

});

OrderCollection = Backbone.Collection.extend({

    model : Order,

    url : "spring-nanotrader-services/api/order",

    findMyOrders : function(userid) {
        var self = this;
        self.reset();
        var url = "spring-nanotrader-services/api/"+userid+"/order";
        $.ajax({
            url : url,
            dataType : "json",
            async : false,
            success : function(data) {
                console.log("findMyOrders success: length: "
                        + data.length);
                self.add(data);
            },
            failure : function(data) {
                console.log("findMyOrders failure");
            }
        });
    }

});
