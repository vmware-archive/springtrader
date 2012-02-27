window.AccountProfile = Backbone.Model.extend({


    initialize:function () {
    },
    
    defaults: {
    	"username": 'kparikh',
    	"creditcard": '1234123412341234',
    	name: 'Kashyap Parikh',
    	address: '123 Main St',
    	email: 'kparikh@vmware.com',
    	password: 'test'
    	//isProfileActive: true
    	
    },
    validation : {
        name : {
            required: true | false,
            pattern: /^[a-zA-Z ]+$/,
            minLength: 3,
            maxLength: 100,
            msg: 'Name is required [3 to 100 alpha characters]'
        },
        email : {
            required: true | false,
            pattern: 'email',
            msg: 'Valid email is required'
        },
        password : {
            required: true | false,
            minLength: 3,
            maxLength: 25,
            pattern: /^[a-zA-Z0-9!@#$%^&*()_]+$/,
            msg: 'Password is required [3 to 25 alphanumeric characters or !@#$%^&*()_]'
        },
        address: {
            required: true | false,
            minLength: 3,
            maxLength: 100,
            pattern: /^[a-zA-Z0-9]+$/,
            msg: 'Address is required [3 to 100 alphanumeric character]'
        },
        creditcard: {
            required: true | false,
            pattern: /^[0-9]+$/,
            minLength: 16,
            maxLength: 16,
            msg: 'Creditcard is required [16 numbers]'
        },
        username: {
            required: true | false,
            minLength: 3,
            maxLength: 25,
            pattern: /^[a-zA-Z0-9_]+$/,
            msg: 'Username is required [3 to 25 alphanumeric characters]'
            
        }
    }

});
