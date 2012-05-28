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
};

/**
 * Opposite to the Backbone.sycn function, we need to rewrite the function that will parse the
 * Object with Javascript Date() objects into the format that the Nanotrader API is expecting
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
Backbone.Model.prototype.toJSON = function()
{
    var attributes = _.clone(this.attributes);
    for (var attr in attributes)
    {
        var value = attributes[attr];
        if ( _.isDate(value) )
        {
            // Fetch the year, month and day
            var date = {
                year  : value.getFullYear().toString(),
                month : value.getMonth().toString(),
                day   : value.getDate().toString()
            };
            // Add a zero padding if it's a month or day with only one number: 1 => 01
            for (var i in date)
            {
                if (date[i].length == 1)
                {
                       date[i] = '0' + date[i];
                }
            }
            attributes[attr] = date.year + '-' + date.month + '-' + date.day;
        }
    }
    return attributes;
};


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
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.AccountProfile = Backbone.Model.extend({
    idAttribute: 'profileid',
    urlRoot: nano.conf.urls.accountProfile,
    url: function() {
        var url = this.urlRoot;
        if (!this.isNew())
        {
            url += '/' + this.id;
        }
        return url;
    },
    // Account Profile model validation
    validate: function(attrs){
        // RegExp attrs validation
        reFullname = new RegExp(/^\b[\w\d\s]{2,25}\b$/);
        reEmail = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        reUserid = new RegExp(/^\b[\w\d]{3,25}\b$/);
        reCreditcard = new RegExp(/^\b[\d]{15,16}\b$/);
        var errors = [];
        
        // fullname validation
        if (attrs.fullname.match(reFullname) == null){
            errors.push("fullnameError");
        }
        // email validation
        if (attrs.email.match(reEmail) == null){
            errors.push("emailError");
        }
        // passwd validation
        if (attrs.passwd.length < 3 || attrs.passwd.length > 25){
            errors.push("passwdError");
        }
        // userid validation
        if (attrs.userid.match(reUserid) == null){
            errors.push("useridError");
        }
        // openbalance validation
        if (attrs.accounts[0].openbalance.length < 3 || attrs.accounts[0].openbalance.length > 100){
            errors.push("openbalanceError");
        }
        // creditcard validation
        if (attrs.creditcard.match(reCreditcard) == null){
            errors.push("creditcardError");
        }
        // address validation
        if (attrs.address.length < 3 || attrs.address.length > 100){
            errors.push("addressError");
        }
        
        if (errors.length > 0){
            return errors
        }
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
        var url = this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
        if (!this.isNew())
        {
            url += '/' + this.id;
        }
        return url;
    }
});

/**
 * Model to interact with the Market Summary Object (Not really a REST based Object, but it works with Backbone.js)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.MarketSummary = Backbone.Model.extend({
    urlRoot : nano.conf.urls.marketSummary
});

nano.models.RecreateData = Backbone.Model.extend({
    urlRoot : nano.conf.urls.recreateData
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
    idAttribute: 'holdingid'
    //=================================================> There's no url for this object, we need to include one!
});

/**
 * Model to interact with the Order Object
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.models.Order = Backbone.Model.extend({
    idAttribute: 'orderid',
    initialize: function(options) {
        this.accountid = options.accountid;
    },

    urlRoot : nano.conf.urls.order,

    url: function() {
        var url = this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    },
    
    // Order model validation
    validate: function(attrs){
        var errors = [];
        
        // quantity validation
        if (attrs.quantity < 1){
            errors.push("quantityError");
        }
        if (errors.length > 0){
            return errors
        }
    }
});

/**
 * Model to interact with the Quote Object
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.models.Quote = Backbone.Model.extend({
    idAttribute: 'quoteid',

    urlRoot : nano.conf.urls.quote,

    url: function() {
        var url = this.urlRoot;
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    }
});

/**
 * Collection to interact with the Holdings Collection (list of Holding Objects)
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.Holdings = Backbone.Collection.extend({

    model : nano.models.Holding,

    initialize: function(options) {
        this.accountid = options.accountid;
        this.page = options.page || 1;
    },

    urlRoot : nano.conf.urls.holdings,

    /**
     * Builds the url to fetch the Collection
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return string: Url for the Holdings Collection
     */
    url: function() {
        return this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
    },

   /**
    * Overwrites the traditional Backbone.sync to include pagination for the collection
    * @author Carlos Soto <carlos.soto@lognllc.com>
    */
    sync: nano.utils.collectionSync,

   /**
    * Called by Backbone whenever a collection's models are returned by the server, in fetch. The function is 
    * passed the raw response object, and should return the array of model attributes to be added to the collection
    * @author Carlos Soto <carlos.soto@lognllc.com>
    * @param Object response: whatever comes from the server
    * @return array of that for the collection
    */
    parse: nano.utils.collectionParse
});

/**
 * Collection to interact with the Orders Collection (list of Order Objects)
 * @author Jean Chassoul <jean.chassoul@lognllc.com>
 */
nano.models.Orders = Backbone.Collection.extend({
    model : nano.models.Order,

    initialize: function(options) {
        this.accountid = options.accountid;
        this.page = options.page || 1;
    },
    urlRoot : nano.conf.urls.orders,

    /**
     * Builds the url to fetch the Collection
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return string: Url for the Orders Collection
     */
    url: function() {
        return this.urlRoot.replace(nano.conf.accountIdUrlKey, this.accountid);
    },


   /**
    * Overwrites the traditional Backbone.sync to include pagination for the collection
    * @author Carlos Soto <carlos.soto@lognllc.com>
    */
    sync: nano.utils.collectionSync,

   /**
    * Called by Backbone whenever a collection's models are returned by the server, in fetch. The function is 
    * passed the raw response object, and should return the array of model attributes to be added to the collection
    * @author Carlos Soto <carlos.soto@lognllc.com>
    * @param Object response: whatever comes from the server
    * @return array of that for the collection
    */
    parse: nano.utils.collectionParse
});
