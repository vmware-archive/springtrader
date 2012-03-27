var urlRoot = '/spring-nanotrader-services/api/';

/**
 * Model to interact with the Event Object
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
Account = Backbone.Model.extend({
    idAttribute: 'accountid',
    urlRoot : urlRoot + 'account'
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