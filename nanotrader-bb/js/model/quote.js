Quote = Backbone.Model.extend({
    idAttribute : 'quoteid',

    urlRoot : 'spring-nanotrader-services/api/quote',

    initialize : function() {
    }

});

QuoteCollection = Backbone.Collection.extend({

    model : Quote,

    url : "spring-nanotrader-services/api/quote",

    findBySymbols : function(symbols) {
        var self = this;
        self.reset();
        // Convert commas to spaces
        symbols.replace(",", " ");
        _.each(symbols.split(" "), function(symbol) {
            if (symbol != "") {
                var url = "spring-nanotrader-services/api/quote/" + symbol;
                // FIX_ME: use a bind instead of ajax call
                console.log("findBySymbols url: " + url);
                $.ajax({
                    url : url,
                    dataType : "json",
                    async : false,
                    success : function(data) {
                        console.log("search success: " + symbol + " length: "
                                + data.length);
                        self.add(data);
                    },
                    failure : function(data) {
                        console.log("quote failure on " + symbol);
                    },
                    beforeSend: function(xhr) {
                        var token = $.cookie('API_TOKEN');
                        if (token !== null) xhr.setRequestHeader('API_TOKEN', token);
                    }
                });
            }

        });
    }

});
