// Global values for all of the modules
var httpHeaders = {'Content-Type': 'application/json'};

//---------------------------------------------------------------------------------------------
// Account Model Test Suite
module('nano.models.Account');

// Global values for the Account Module
var accountid = 1;
var accountData = {
    "creationdate" : "2012-04-24",
    "openbalance"  : 100,
    "logoutcount"  : 13,
    "balance"      : 924240.14,
    "lastlogin"    : "2012-05-07",
    "logincount"   : 72,
    "accountid"    : accountid
    };

test('save', 2, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        201, 
        httpHeaders,
        '{"accountid":' + accountid + '}'
    ];

    // Create a new Account Model Instance
    var account = new nano.models.Account();

    // Build fake server for the Account Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('POST', account.url(), fakeResponse);

    // Test the function for the Account Model and throw the assertion
    var postData = _.clone(accountData);
    delete postData.accountid; // delete the accountid, since we don't need it for POST (the server returns the account id)
    account.save(postData, {
        success:function(model, response){
            ok(true, 'Account successfully created');
        },
        error: function(model, response){
            ok(false, 'Error creating Account');
        }
    });
    server.respond();

    // Build fake server for the Account Model
    fakeResponse = [
        200, 
        httpHeaders,
        ''
    ];
    server.respondWith('PUT', account.url(), fakeResponse);

    //Change one of the values and save it again
    var newBalance = 42;
    account.save({'balance' : newBalance}, {
        success:function(model, response){
            equal(newBalance, model.get('balance'), 'Account successfully updated');
        },
        error: function(model, response){
            ok(false, 'Error updating Account');
        }
    });
    server.respond();
});

test('fetch', 1, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        200, 
        httpHeaders,
        JSON.stringify(accountData)
    ];

    // Create a new Account Model Instance
    var account = new nano.models.Account({ accountid : accountid });

    // Build fake server for the Account Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('GET', account.url(), fakeResponse);

    // Test the function for the Account Model and throw the assertion
    account.fetch({
        success:function(model, response){
            //Compare the data we prevoiusly had (under the global "data" var) with the data returned in the model
            deepEqual(model.toJSON(), accountData, 'Account successfully fetched');
        },
        error: function(model, response){
            ok(false, 'Error fetching the Account');
        }
    });
    server.respond();

});

test('destroy', 1, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        200, 
        httpHeaders,
        ''
    ];

    // Create a new Account Model Instance
    var account = new nano.models.Account({ accountid : accountid });

    // Build fake server for the Account Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('DELETE', account.url() , fakeResponse);

    // Test the function for the Account Model and throw the assertion
    account.destroy({
        success:function(model, response){
            ok(true, 'Account successfully deleted');
        },
        error: function(model, response){
            ok(false, 'Error deleting the Account');
        }
    });
    server.respond();
});

//---------------------------------------------------------------------------------------------
// AccountProfile Model Test Suite
module('nano.models.AccountProfile');

// Global values for the AccountProfile Module
var profileid = 1;
var accountProfileData = {
        accounts : [accountData],
        address : "My Random Address",
        creditcard : "1111222233334444",
        email : "carlos.soto@lognll.com",
        fullname : "Carlos Soto",
        passwd : "carlos",
        profileid : profileid,
        userid : "carlos"
};

test('save', 2, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        201, 
        httpHeaders,
        '{"profileid":' + profileid + '}'
    ];

    //Create a new AccountProfile Instance
    var accountProfile = new nano.models.AccountProfile();

    // Build fake server for the AccountProfile Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('POST', accountProfile.url(), fakeResponse);

    // Test the function for the AccountProfile Model and throw the assertion
    var postData = _.clone(accountProfileData);
    delete postData.profileid; // delete the profileid, since we don't need it for POST (the server returns the profile id)
    accountProfile.save(postData, {
        success:function(model, response){
            ok(true, 'AccountProfile successfully created');
        },
        error: function(model, response){
            ok(false, 'Error creating AccountProfile');
        }
    });
    server.respond();

    // Build fake server for the Account Model
    fakeResponse = [
        200, 
        httpHeaders,
        ''
    ];
    server.respondWith('PUT', accountProfile.url(), fakeResponse);

    //Change one of the values and save it again
    var newAddress = 'New Random Address';
    accountProfile.save({'address' : newAddress}, {
        success:function(model, response){
            equal(newAddress, model.get('address'), 'AccountProfile successfully updated');
        },
        error: function(model, response){
            ok(false, 'Error updating AccountProfile');
        }
    });
    server.respond();
});

test('fetch', 1, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        200, 
        httpHeaders,
        JSON.stringify(accountProfileData)
    ];

    //Create a new AccountProfile Instance
    var accountProfile = new nano.models.AccountProfile({ profileid : profileid });

    // Build fake server for the AccountProfile Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('GET', accountProfile.url(), fakeResponse);

    // Test the function for the AccountProfile Model and throw the assertion
    accountProfile.fetch({
        success:function(model, response){
            //Compare the data we prevoiusly had (under the global "data" var) with the data returned in the model
            deepEqual(model.toJSON(), accountProfileData, 'AccountProfile successfully fetched');
        },
        error: function(model, response){
            ok(false, 'Error fetching the AccountProfile');
        }
    });
    server.respond();

});

test('destroy', 1, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        200, 
        httpHeaders,
        ''
    ];

    //Create a new AccountProfile Instance
    var accountProfile = new nano.models.AccountProfile({ profileid : profileid });

    // Build fake server for the AccountProfile Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('DELETE', accountProfile.url() , fakeResponse);

    // Test the function for the AccountProfile Model and throw the assertion
    accountProfile.destroy({
        success:function(model, response){
            ok(true, 'Account successfully deleted');
        },
        error: function(model, response){
            ok(false, 'Error deleting the Account');
        }
    });
    server.respond();
});

//---------------------------------------------------------------------------------------------
// PortfolioSummary Model Test Suite
module('nano.models.PortfolioSummary');

// Global values for the PortfolioSummary Module
var portfoliosummaryid = 1;
var portfolioSummaryData = {
    "numberOfHoldings" : 24,
    "totalBasis"       : 77764.21,
    "totalMarketValue" : 61253.81,
    "gain"             : -16510.40,
    "accountid"        : accountid,
    "id"               : portfoliosummaryid // we're adding a fake pkey for the Portfolio Summary so that we can make the REST CRUD Tests
};

test('save', 2, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        201, 
        httpHeaders,
        '{"id":' + portfoliosummaryid + '}'
    ];

    //Create a new PortfolioSummary Instance
    var portfolioSummary = new nano.models.PortfolioSummary( {accountid : accountid} );

    // Build fake server for the PortfolioSummary Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('POST', portfolioSummary.url(), fakeResponse);

    // Test the function for the PortfolioSummary Model and throw the assertion
    var postData = _.clone(portfolioSummaryData);
    delete postData.id; // delete the id, since we don't need it for POST (the server returns the id)
    portfolioSummary.save(postData, {
        success:function(model, response){
            ok(true, 'PortfolioSummary successfully created');
        },
        error: function(model, response){
            ok(false, 'Error creating PortfolioSummary');
        }
    });
    server.respond();

    // Build fake server for the Account Model
    fakeResponse = [
        200, 
        httpHeaders,
        ''
    ];
    server.respondWith('PUT', portfolioSummary.url(), fakeResponse);

    //Change one of the values and save it again
    var newNumberOfHoldings = 42;
    portfolioSummary.save({'numberOfHoldings' : newNumberOfHoldings}, {
        success:function(model, response){
            equal(newNumberOfHoldings, model.get('numberOfHoldings'), 'PortfolioSummary successfully updated');
        },
        error: function(model, response){
            ok(false, 'Error updating PortfolioSummary');
        }
    });
    server.respond();
});

test('fetch', 1, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        200, 
        httpHeaders,
        JSON.stringify(portfolioSummaryData)
    ];

    //Create a new PortfolioSummary Instance
    var portfolioSummary = new nano.models.PortfolioSummary( {accountid : accountid} );

    // Build fake server for the PortfolioSummary Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('GET', portfolioSummary.url(), fakeResponse);

    // Test the function for the PortfolioSummary Model and throw the assertion
    portfolioSummary.fetch({
        success:function(model, response){
            //Compare the data we prevoiusly had (under the global "data" var) with the data returned in the model
            deepEqual(model.toJSON(), portfolioSummaryData, 'PortfolioSummary successfully fetched');
        },
        error: function(model, response){
            ok(false, 'Error fetching the PortfolioSummary');
        }
    });
    server.respond();

});

test('destroy', 1, function() {

    // Response we're faking to the Model
    var fakeResponse = [
        200, 
        httpHeaders,
        ''
    ];

    //Create a new PortfolioSummary Instance
    var portfolioSummary = new nano.models.PortfolioSummary( {accountid : accountid, id : portfoliosummaryid} );

    // Build fake server for the PortfolioSummary Model
    var server = this.sandbox.useFakeServer();
    server.respondWith('DELETE', portfolioSummary.url() , fakeResponse);

    // Test the function for the PortfolioSummary Model and throw the assertion
    portfolioSummary.destroy({
        success:function(model, response){
            ok(true, 'Account successfully deleted');
        },
        error: function(model, response){
            ok(false, 'Error deleting the Account');
        }
    });
    server.respond();
});