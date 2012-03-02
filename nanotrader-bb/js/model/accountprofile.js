window.AccountProfile = Backbone.Model.extend({

    urlRoot: 'data/accountprofile',
    
    initialize:function () {
        var model = this;
        var test = $.ajax({
            type : "POST",
            url : 'data/accountprofile.json',
            dataType : 'json',
            async : false,
            success : function(response) {
                model.set(response.results[0]);
            },
            error : function(xhr, testStatus, errorThrown) {
                alert(xhr.status);
            }
        });
    },
    
    validation : {
        fullname : {
            required: true,
            pattern: /^[a-zA-Z ]+$/,
            minLength: 3,
            maxLength: 100,
            msg: 'Name is required [3 to 100 alpha characters]'
        },
        email : {
            required: true ,
            pattern: 'email',
            msg: 'Valid email is required'
        },
        password : {
            required: true ,
            minLength: 3,
            maxLength: 25,
            pattern: /^[a-zA-Z0-9!@#$%^&*()_]+$/,
            msg: 'Password is required [3 to 25 alphanumeric characters or !@#$%^&*()_]'
        },
        password_confirm : {
            equalTo: 'password'
        },
        address : {
            required: true ,
            minLength: 3,
            maxLength: 100,
            pattern: /[a-zA-Z0-9]+$/,
            msg: 'Address is required [3 to 100 alphanumeric character]'
        },
        creditcard: {
            required: true,
            pattern: /^[0-9]+$/,
            minLength: 16,
            maxLength: 16,
            msg: 'Creditcard is required [16 numbers]'
        },
        username: {
            required: true ,
            minLength: 3,
            maxLength: 25,
            pattern: /^[a-zA-Z0-9_]+$/,
            msg: 'Username is required [3 to 25 alphanumeric characters]'
            
        }
    }

});
