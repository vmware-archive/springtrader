beforeEach(function() {
    SpringTrader.app = Ext.create('Ext.app.Application', {name: 'SpringTrader'});
});
afterEach(function() {
    SpringTrader.app.destroy();
});

var marketSummaryJSON;
beforeEach(function () {
    marketSummaryJSON = {
        "tradeStockIndexAverage": 103.20,
        "tradeStockIndexVolume": 22497.00,
        "tradeStockIndexOpenAverage": 104.45,
        "change": -125.09,
        "percentGain": -1.00,
        "summaryDate": "2013-04-15",
        "topLosers": [
            {
                "quoteid": 24,
                "low": 132.92,
                "open1": 158.10,
                "volume": 261.00,
                "price": 108.99,
                "high": 174.10,
                "companyname": "Citrix Systems, Inc.",
                "symbol": "CTXS",
                "change1": -49.11,
                "version": 0
            },
            {
                "quoteid": 64,
                "low": 148.13,
                "open1": 158.15,
                "volume": 202.00,
                "price": 119.99,
                "high": 159.15,
                "companyname": "Micron Technology, Inc.",
                "symbol": "MU",
                "change1": -38.16,
                "version": 0
            },
            {
                "quoteid": 9,
                "low": 96.11,
                "open1": 130.65,
                "volume": 369.00,
                "price": 94.04,
                "high": 122.65,
                "companyname": "Apple Inc.",
                "symbol": "AAPL",
                "change1": -36.61,
                "version": 0
            }
        ],
        "topGainers": [
            {
                "quoteid": 72,
                "low": 170.97,
                "open1": 171.97,
                "volume": 245.00,
                "price": 228.26,
                "high": 209.41,
                "companyname": "O Reilly Automotive, Inc.",
                "symbol": "ORLY",
                "change1": 56.29,
                "version": 0
            },
            {
                "quoteid": 85,
                "low": 176.30,
                "open1": 189.30,
                "volume": 262.00,
                "price": 241.24,
                "high": 223.37,
                "companyname": "Sirius XM Radio Inc.",
                "symbol": "SIRI",
                "change1": 51.94,
                "version": 0
            },
            {
                "quoteid": 43,
                "low": 166.35,
                "open1": 169.35,
                "volume": 132.00,
                "price": 215.17,
                "high": 182.35,
                "companyname": "FLIR Systems, Inc.",
                "symbol": "FLIR",
                "change1": 45.82,
                "version": 0
            }
        ]
    };
});

var userJSON;
beforeEach(function () {
    userJSON = {
        "fullname": "test",
        "email": "test@test.com",
        "passwd": "testing",
        "userid": "test1",
        "openbalance": 1000000.00,
        "creditcard": "1234123412341234",
        "address": "san francisco"
    };
});

// Only used as expectation during POST(create)
var userPostJSON;
beforeEach(function() {
    userPostJSON = {
        "fullname": "test",
        "email": "test@test.com",
        "passwd": "testing",
        "userid": "test1",
        "accounts": [
            {"openbalance": "1000000"}
        ],
        "creditcard": "1234123412341234",
        "address": "san francisco"
    };
});

var userFormJSON;
beforeEach(function () {
    userFormJSON = {
        "fullname": "test",
        "email": "test@test.com",
        "passwd": "testing",
        "passwdconfirm": "testing",
        "userid": "test1",
        "openbalance": 1,
        "address": "san francisco"
    };
});

var loginOkResponseJSON;
beforeEach(function () {
    loginOkResponseJSON = {
        "authToken": "b637a94d-9ccf-40e4-8a6a-a6447098f8d3",
        "profileid": 9,
        "accountid": 9
    };
});

var accountJSON;
beforeEach(function () {
    accountJSON = {
        "creationdate": "2013-04-29",
        "openbalance": 1000000.00,
        "logoutcount": 2,
        "balance": 939827.43,
        "lastlogin": "2013-04-29",
        "logincount": 10,
        "accountid": 9}
});

var portfolioSummaryJSON;

beforeEach(function() {
   portfolioSummaryJSON = {
       "numberOfHoldings":5,
       "totalBasis":63865.73,
       "totalMarketValue":66960.94,
       "gain":3095.21
   }
});

var holdingSummaryJSON;
beforeEach(function() {
    holdingSummaryJSON = {
        "holdingsTotalGains":3838.25,
        "holdingRollups":[
            {"symbol":"NWSA","percent":77.22,"gain":2963.99},
            {"symbol":"MSFT","percent":15.12,"gain":580.26},
            {"symbol":"MYL","percent":7.660,"gain":294.00}
        ]}
});

var holdingListJSON;
beforeEach(function() {
   holdingListJSON = {
       "page": 0,
       "pageSize": 5,
       "totalRecords": 5,
       "results": [
           {
               "holdingid": 74,
               "purchaseprice": 78.79,
               "quantity": 113,
               "purchasedate": "2013-05-03",
               "accountAccountid": 9,
               "quote": {
                   "quoteid": 65,
                   "low": 64.79,
                   "open1": 76.79,
                   "volume": 223.00,
                   "price": 104.19,
                   "high": 89.82,
                   "companyname": "Microsoft Corporation",
                   "symbol": "MSFT",
                   "change1": 27.40,
                   "version": 0
               }
           },
           {
               "holdingid": 75,
               "purchaseprice": 69.96,
               "quantity": 128,
               "purchasedate": "2013-05-03",
               "accountAccountid": 9,
               "quote": {
                   "quoteid": 66,
                   "low": 67.96,
                   "open1": 67.96,
                   "volume": 128.00,
                   "price": 72.06,
                   "high": 74.96,
                   "companyname": "Mylan Inc.",
                   "symbol": "MYL",
                   "change1": 4.10,
                   "version": 0
               }
           },
           {
               "holdingid": 76,
               "purchaseprice": 107.75,
               "quantity": 126,
               "purchasedate": "2013-05-03",
               "accountAccountid": 9,
               "quote": {
                   "quoteid": 67,
                   "low": 107.75,
                   "open1": 126.75,
                   "volume": 126.00,
                   "price": 107.75,
                   "high": 114.75,
                   "companyname": "NetApp, Inc.",
                   "symbol": "NTAP",
                   "change1": -19.00,
                   "version": 0
               }
           },
           {
               "holdingid": 77,
               "purchaseprice": 84.11,
               "quantity": 108,
               "purchasedate": "2013-05-03",
               "accountAccountid": 9,
               "quote": {
                   "quoteid": 68,
                   "low": 78.11,
                   "open1": 86.11,
                   "volume": 108.00,
                   "price": 86.63,
                   "high": 84.11,
                   "companyname": "Netflix, Inc.",
                   "symbol": "NFLX",
                   "change1": 0.52,
                   "version": 0
               }
           },
           {
               "holdingid": 78,
               "purchaseprice": 187.36,
               "quantity": 130,
               "purchasedate": "2013-05-03",
               "accountAccountid": 9,
               "quote": {
                   "quoteid": 69,
                   "low": 183.36,
                   "open1": 185.36,
                   "volume": 130.00,
                   "price": 219.21,
                   "high": 194.36,
                   "companyname": "News Corporation",
                   "symbol": "NWSA",
                   "change1": 33.85,
                   "version": 0
               }
           }
       ]
   };
});

var quoteJSON;
beforeEach(function(){
    quoteJSON = {
        "quoteid":9,
        "low":105.07,
        "open1":130.65,
        "volume":376.00,
        "price":100.87,
        "high":128.14,
        "companyname":"VMware Inc.",
        "symbol":"VMW",
        "change1":-29.78,
        "version":0
    };
});