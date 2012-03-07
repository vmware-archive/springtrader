var Account = Backbone.Model.extend({
    idAttribute : 'accountid'
});

var Accounts = Backbone.Collection.extend({
    model : Account,
});
AccountProfile = Backbone.Model.extend({

    urlRoot : 'spring-nanotrader-services/api/accountProfile',

    initialize : function() {
        this.accounts = nestCollection(this, 'accounts', new Accounts(this.get('accounts')));
        var model = this;
        $.ajax({
            type : "GET",
            url : model.url(),
            dataType : 'json',
            //Make synchronous ajax call
            async : false,
            //Since GET request is cached, make the cache to false
            cache : false,
            success : function(response) {
                model.set(response);
            },
            error : function(xhr, textStatus, errorThrown) {
                alert('Error' + xhr.status + " " + errorThrown);
            }
        });
    },
    validation : {
        fullname : {
            required : true,
            pattern : /^[a-zA-Z ]+$/,
            minLength : 3,
            maxLength : 100,
            msg : 'Name is required [3 to 100 alpha characters]'
        },
        email : {
            required : true,
            pattern : 'email',
            msg : 'Valid email is required'
        },
        passwd : {
            required : true,
            minLength : 3,
            maxLength : 25,
            pattern : /^[a-zA-Z0-9!@#$%^&*()_]+$/,
            msg : 'Password is required [3 to 25 alphanumeric characters or !@#$%^&*()_]'
        },
        password_confirm : {
            equalTo : 'passwd'
        },
        address : {
            required : true,
            minLength : 3,
            maxLength : 100,
            pattern : /[a-zA-Z0-9]+$/,
            msg : 'Address is required [3 to 100 alphanumeric character]'
        },
        creditcard : {
            required : true,
            pattern : /^[0-9]+$/,
            minLength : 16,
            maxLength : 16,
            msg : 'Creditcard is required [16 numbers]'
        },
        userid : {
            required : true,
            minLength : 3,
            maxLength : 25,
            pattern : /^[a-zA-Z0-9_]+$/,
            msg : 'Username is required [3 to 25 alphanumeric characters]'

        }
    }

});
