
/**
 * This part is tricky. We're using Backbone.js to handle all of the communication between our code 
 * and the REST api. If you're not familiar with Backbone please go to the Backbone.js site 
 * (http://documentcloud.github.com/backbone) before continuing reading this code (I know it's a LOT 
 * of reading, but trust me, it'll be worth it. This following sync code, overwrites the default sync 
 * function used by Backbone to send requests to the server so that we can parse any dates using into 
 * Javascript Date() objects... This way, the models used later won't have to deal 
 * with the problem of parsing the response into Date Objects that they can use.
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
        // changing the Pearson Date string into a Date() object
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
 * Model to interact with the Event Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.Account = Backbone.Model.extend({
    idAttribute: 'accountid',
    urlRoot : nano.conf.urlRoot + 'account'
    /*
    url : function(){
        var url = urlRoot + 'account/';
        if ( !this.isNew() )
        {
            url += this.id;
        }
        return url;
    }
    */
});

/**
 * Model to interact with the Event Object. 
 * Not really a REST based architecture which is why we're using a regular ajax call.
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.models.MarketSummary = function(){
    this.attributes = {};
    this.fetch = function(callbacks){
        var model = this;
        $.ajax({
            url : nano.conf.urlRoot + 'marketSummary',
            headers : nano.utils.getHttpHeaders(),
            success : function(data, textStatus, jqXHR){
                var response = {
                    textStatus : textStatus,
                    jqXHR : jqXHR
                };
                model.attributes = data;
                if (_.isFunction(callbacks.success))
                {
                    callbacks.success(model, response);
                }
            },
            error : function(jqXHR, textStatus, errorThrown){
                var response = {
                    textStatus : textStatus,
                    errorThrown : errorThrown,
                    jqXHR : jqXHR
                };
                if (_.isFunction(callbacks.error))
                {
                    callbacks.error(model, response);
                }
            }
        });
    };
    this.get = function(key){
        var value = null;
        if (!_.isNull(this.attributes[key]))
        {
            value = this.attributes[key];
        }
        return value;
    };
}