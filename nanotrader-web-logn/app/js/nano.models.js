
/**
 * Since we're using Backbone.js to handle all of the communication between our code 
 * and the REST api, we're overwriting the default sync function used by Backbone to 
 * send requests to the server so that we can parse any dates using into 
 * Javascript Date() objects... This way, the models used later won't have to deal 
 * with the problem of parsing the response into Date Objects that they can use.
 * We're also including the Nanaotrader headers here so we don't have to add them on every call.
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
Backbone._sync_orig = Backbone.sync;
Backbone.sync = function(method, model, options)
{
    // First, create the proper url before doing the call
    var url = options.url || model.url();
    options.url = url;

    var success = options.success;
    options.success = function(resp, status, xhr)
    {
        // This is the function that will run through the model
        // changing the Nanotrader Date string into a Date() object
        var convertDateStrs = function(obj)
        {
            for (var i in obj)
            {
                if (_.isString(obj[i]) && obj[i].match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{4}/))
                {
                    obj[i] = new Date(obj[i]);
                }
            }
        }

        // if the resp is a list iterate throught the list.
        if (_.isArray(resp))
        {
            _.each(resp, convertDateStrs);
        }
        // if not, just run the function once.
        else
        {
            convertDateStrs(resp);
        }

        if (success)
        {
            success(resp, status, xhr);
        }
    };

    // Add the proper Nanotrader HTTP headers
    options.headers = nano.utils.getHttpHeaders();

    return Backbone._sync_orig(method, model, options);
}

/**
 * Model to interact with the Account Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.Account = Backbone.Model.extend({
    idAttribute: 'accountid',
    urlRoot : nano.conf.urls.account
});

/**
 * Model to interact with the Account Profile Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.AccountProfile = Backbone.Model.extend({
    idAttribute: 'profileid',
    urlRoot : nano.conf.urls.accountProfile,
    url: function() {
        var url = this.urlRoot;
        if (!this.isNew())
        {
            url += '/' + this.id;
        }
        return url;
    }
});

/**
 * Model to interact with the Account Profile Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.PortfolioSummary = Backbone.Model.extend({
    initialize: function(options) {
        this.accountid = options.accountid;
    },
    urlRoot : nano.conf.urls.portfolioSummary,
    url: function() {
        return this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
    }
});

/**
 * Model to interact with the Market Summary Object (Not really a REST based Object, but it works with Backbone.js)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.MarketSummary = Backbone.Model.extend({
    urlRoot : nano.conf.urls.marketSummary,
});

/**
 * Model to interact with the Holding Summary Object (Not really a REST based Object, but it works with Backbone.js)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.HoldingSummary = Backbone.Model.extend({
    initialize: function(options) {
        this.accountid = options.accountid;
    },
    urlRoot : nano.conf.urls.holdingSummary,
    url: function() {
        return this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
    }
});

/**
 * Model to interact with the Holding Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.Holding = Backbone.Model.extend({
    idAttribute: 'holdingid',
    //=================================================> There's no url for this object, we need to include one!
});

/**
 * Collection to interact with the Holdings Collection (list of Holding Objects)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.Holdings = Backbone.Collection.extend({
    model : nano.models.Holding,
    initialize: function(options) {
        this.accountid = options.accountid;
    },
    urlRoot : nano.conf.urls.holdings,

    /**
     * Builds the url to fetch the Collection
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return string: Url for the Holdings Collection
     */
    url: function() {
        return this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
    }
});

/**
 * Model to interact with the Order Object
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
//nano.models.Order = Backbone.Model.extend({
//    idAttribute: 'orderid',
//    //=================================================> There's no url for this object, we need to include one!
//});
nano.models.Order = Backbone.Model.extend({
    idAttribute: 'orderid',
    initialize: function(options) {
        this.accountid = options.accountid;
    },
    urlRoot : nano.conf.urls.orders,
    url: function() {
        var url = this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    }
});

/**
 * Collection to interact with the Orders Collection (list of Order Objects)
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.models.Orders = Backbone.Collection.extend({
    model : nano.models.Order,
    
    initialize: function(options) {
        this.accountid = options.accountid;
    },
    urlRoot : nano.conf.urls.orders,

    /**
     * Builds the url to fetch the Collection
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return string: Url for the Orders Collection
     */
    url: function() {
        return this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
    }
});

/**
 * Model to interact with the Quote Object
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.models.Quote = Backbone.Model.extend({
    idAttribute: 'quoteid',
    //=================================================> There's no url for this object, we need to include one!
});


/**
 * Collection to interact with the Orders Collection (list of Order Objects)
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.models.Quotes = Backbone.Collection.extend({
    model : nano.models.Quote,
    
    initialize: function(options) {
        this.quoteid = options.quoteid;
    },
    urlRoot : nano.conf.urls.quote,

    url: function() {
        var url = this.urlRoot;
        url += '/' + this.quoteid;
        
        return url;
    }
});
