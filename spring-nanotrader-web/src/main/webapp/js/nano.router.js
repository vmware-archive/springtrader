/**
 * Router class for the application: http://documentcloud.github.com/backbone/#Router
 * @author Carlos Soto <carlos.soto>
 * @author Kashyap Parikh
 */

nano.Router = Backbone.Router.extend({
    /**
     * Maps the functions to the urls
     * @author Carlos Soto <carlos.soto>
     */
    routes: {
	// Dashboard Page
	"": "dashboard",
        "dashboard": "dashboard",
        "dashboard/p:page":"dashboard",

	// Portfolio Page
	"portfolio": "portfolio",
    "portfolio/p:page": "portfolio",
    "portfolio/r:random": "portfolio",

	// Trade Page
	"trade/p:page": "trade",
    "trade/q:quote": "trade",
    "trade/q:quote/p:page": "trade",
	
	// Login Page
        "login/:error": "login",
        "login": "login",
        
	// Others
	"help": "help",
        "registration": "registration",
        "trade": "trade",
        "profile": "profile",
        "contact": "contact",
        "admin": "admin",
        "overview": "overview"
    },

    initialize: function () {
	'use strict';
        var marketSummary = new nano.models.MarketSummary();

        nano.instances.navbar = new nano.views.Navbar({el : '#nc-navbar'});
        nano.instances.footer = new nano.views.Footer({el : '#nc-footer'});
        nano.instances.marketSummary = new nano.views.MarketSummary({el : '#nc-market-summary'});	
        nano.instances.portfolioSummary = new nano.views.PortfolioSummary({el : '#nc-portfolio-summary'});
        nano.instances.accountSummary = new nano.views.AccountSummary({el : '#nc-account-summary'});
        nano.instances.userStatistics = new nano.views.UserStatistics({el : '#nc-user-statistics'});
        nano.instances.portfolio = new nano.views.Portfolio({el : '#nc-portfolio'});
        nano.instances.login = new nano.views.Login({el : '#nc-login'});
        nano.instances.registration = new nano.views.Registration({el : '#nc-registration'});
        nano.instances.positions = new nano.views.Positions({el : '#nc-positions'});
        nano.instances.holdings = new nano.views.Holdings({el: '#nc-holdings'});
        nano.instances.profile = new nano.views.Profile({el : '#nc-profile'});
        nano.instances.contact = new nano.views.Contact({el: '#nc-contact'});
        nano.instances.quotes = new nano.views.Quotes({el : '#nc-quotes'});
        nano.instances.orders = new nano.views.Orders({el: '#nc-orders'});
        nano.instances.help = new nano.views.Help({el : '#nc-help'});
        nano.instances.overview = new nano.views.Overview({el: '#nc-overview'});
        nano.instances.admin = new nano.views.Admin({el: '#nc-admin'});
        nano.instances.leftnavbar = new nano.views.Leftnavbar({el : '#nc-leftnavbar'}); // Left navbar for profile, overview, help and admin

        //Store the dom Object for the loading message div.
        nano.containers.loading = $('#nc-loading');

        // The first thing we need to do first is to render
        // the Market Summary, since it's shown on every page.
        marketSummary.fetch({
            success: function (model, response) {
                // Hide the loading Message
                nano.containers.loading.hide();
                // Render the Market Summary with the newly fetched info
		nano.instances.marketSummary.render(model);
	    },
            error: nano.utils.onApiError
        });

        // Create an interval to update the Market Summary section every X amount of time
        window.setInterval(function () {
            marketSummary.fetch({
                success : function (model, response) {
                    nano.instances.marketSummary.update(model);
                }
            });
       },
       nano.conf.marketSummaryUpdateMillisecs);
    },

    help: function() {
        if(nano.utils.loggedIn()){
            // Set the Account profile model with the profileid of the current user
            var profile = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            profile.fetch({
                success : function() {
                    // Render the leftnavbar
                    var data = {
                        fullname : profile.get('fullname'),
                        email : profile.get('email'),
                        lastlogin : profile.get('lastlogin')
                    }
                    nano.instances.leftnavbar.render(data);
                },
                error : nano.utils.onApiError
            });
            
            nano.utils.hideAll(false);
            // Render the navbar
            nano.instances.navbar.render();
        } else {
            nano.utils.hideAll(false);
            nano.instances.leftnavbar.render();
        }
        // Render the Help view
        nano.instances.help.render();
        // Render the footer
        nano.instances.footer.render();
    },

    overview: function() {
        if(nano.utils.loggedIn()){
            // Set the Account profile model with the profileid of the current user
            var profile = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            profile.fetch({
                success : function() {
                    // Render the leftnavbar
                    var data = {
                        fullname : profile.get('fullname'),
                        email : profile.get('email'),
                        lastlogin : profile.get('lastlogin')
                    }
                    nano.instances.leftnavbar.render(data);
                },
                error : nano.utils.onApiError
            });
            
            nano.utils.hideAll(false);
            // Render the navbar
            nano.instances.navbar.render();
        } else {
            nano.utils.hideAll(false);
            nano.instances.leftnavbar.render();
        }
        
        // Render the Application Overview
        nano.instances.overview.render();
        // Render the footer
        nano.instances.footer.render();
    },

    dashboard: function (page) {
		'use strict';
		if (isNaN(page)) {
			page = 1;
		}
		var modelCount = 0,
			models = {},	    
			/**
			 * Function that checks if all data has been fetched so that it can then render the page
			 */
			onFetchSuccess = function () {
				if (++modelCount === _.keys(models).length) {
					// If all models have been fetched, then render all of the views needed for the Dashboard
					nano.containers.loading.hide();
					nano.instances.userStatistics.render(models.account);
					nano.instances.accountSummary.render(models.account, models.portfolioSummary);					
					nano.instances.portfolio.render(models.account, models.portfolioSummary);
					nano.instances.positions.render(models.holdingSummary);
					nano.instances.orders.render(models.orders, page, nano.conf.hash.dashboardWithPage);
					nano.instances.footer.render();
				}
			};
		
		// Render the Dashboard of logged in or the Login otherwise
		if (nano.utils.loggedIn()) {
			// Load all quote Symbols in localstorage
			// Symbols from localStorage is used on trade page to autocomplete
			// the quote input field
			nano.utils.loadSymbols();
		
			nano.utils.hideAll();
			nano.containers.loading.show();
			nano.instances.navbar.render();
	
			models = {
			account : new nano.models.Account({accountid : nano.session.accountid}),
			holdingSummary : new nano.models.HoldingSummary({ accountid : nano.session.accountid }),
			portfolioSummary : new nano.models.PortfolioSummary({ accountid : nano.session.accountid }),
			orders : new nano.models.Orders({ accountid : nano.session.accountid })
			};
				for (var i in models) {
					models[i].fetch({
						success : onFetchSuccess,
						error : nano.utils.onApiError
					});
				}
		} else {
			nano.instances.router.navigate(nano.conf.hash.login, true);
		}
    },

    login: function (error) {
        'use strict';
        if (nano.utils.loggedIn()) {
            nano.instances.router.navigate(nano.conf.hash.dashboard, true);
        } else {
            nano.utils.hideAll();
            nano.instances.login.render(error);
            nano.instances.navbar.renderLogin();
        }
        nano.instances.footer.render();
    },

    registration: function (error) {
        'use strict';
        if (nano.utils.loggedIn()) {
            nano.instances.router.navigate(nano.conf.hash.dashboard, true);
        } else {
            nano.utils.hideAll();
            nano.instances.registration.render(error);
        }
        nano.instances.footer.render();
    },

    portfolio: function (page) {
		'use strict';
		var modelCount = 0,
			models =  {},
			onFetchSuccess = function() {
			if (++modelCount === _.keys(models).length)
			{
				nano.containers.loading.hide();
				nano.instances.portfolio.render(models.account,models.portfolioSummary);
				nano.instances.portfolioSummary.render(models.portfolioSummary);
				nano.instances.holdings.render(models.holdings, page);
				nano.instances.footer.render();
			}
		};
        if (isNaN(page)) {
            page = 1;
        }
		if (nano.utils.loggedIn()) {
            nano.utils.hideAll();
			nano.containers.loading.show();
			nano.instances.navbar.render(nano.conf.hash.portfolio);
			// Change the tag element to 'nc-holdings' in case it was changed at the trade page
			nano.instances.holdings.setElement("#nc-holdings"); // Who did this and why?!?!
			models = {
						account : new nano.models.Account({accountid : nano.session.accountid}),
						portfolioSummary : new nano.models.PortfolioSummary({ accountid : nano.session.accountid }),
						holdings : new nano.models.Holdings({ accountid : nano.session.accountid, page:page })
			};
            for (var i in models) {
                models[i].fetch({
                    success : onFetchSuccess,
                    error : nano.utils.onApiError
                });
            }
        } else {
            nano.instances.router.navigate(nano.conf.hash.login, true);
        }
    },

    holdings: function (page) {
        'use strict';
        if (isNaN(page)) {
            page = 1;
        }
        if (!nano.containers.holdings.html()) {
            this.portfolio(page);
        } else {
            // Fetch the info for the Holdings page we need
            var holdings = new nano.models.Holdings({ accountid : nano.session.accountid });
            holdings.fetch({
                data: {page: page},
                success: function (model, response) {
                    // Hide the loading Message
                    nano.containers.loading.hide();
                    
                    // Render the Holdings with the newly fetched info
                    nano.instances.holdings.render(model, page);
                },
                error: nano.utils.onApiError
            });
        }
        nano.instances.footer.render();
    },
	
    trade: function (page, quote) {
		'use strict';
		var i,
			models,
			onFetchSuccess,
			count = 0,
			size;
		if (isNaN(page)) {
            page = 1;
        }
        if (nano.utils.loggedIn()) {
            nano.utils.hideAll();
            // Hide the loading Message
            nano.containers.loading.show();
            nano.instances.navbar.render(nano.conf.hash.trade);
			nano.instances.footer.render();
            models = {
				orders: new nano.models.Orders({ accountid : nano.session.accountid }),
				holdings: new nano.models.Holdings({ accountid : nano.session.accountid })
			}
			if (quote) {
				models.quote = new nano.models.Quote({ quoteid : quote });	
			}
			size = _.size(models);
            onFetchSuccess = function () {
				if (++count === size) {
					nano.containers.loading.hide();
					// Render the Holdings with the newly fetched info
                    nano.instances.holdings.render(models.holdings, page);
					nano.instances.orders.render(models.orders, page, nano.conf.hash.tradeWithPage);
					if (models.quote) {
						nano.instances.quotes.render(models.quote);	
					} else {
						nano.instances.quotes.render();	
					}
				}
			};
			for (i in models) {
                models[i].fetch({
					data: {page: page},
                    success : onFetchSuccess,
                    error : nano.utils.onApiError
                });
            }
		} else {
            // "reload" the current view by adding a random number to trigger a refresh
			nano.instances.router.navigate(window.location + '?r=' + Math.floor(Math.random()*101), true);
		}
    },	

    quotes: function(quote) {
        if (!nano.containers.quotes.html()) {
            this.trade(1, quote);
        }
        else {
            // Fetch the info for the given quote symbol
            var model = new nano.models.Quote({ quoteid : quote });
            
            model.fetch({
                success : function(model, response){
                    // Render the quote
                    nano.instances.quotes.render(model, quote);
                    nano.instances.trade.error(false)
                },
                error: function(){
                    nano.instances.trade.error(true);
                }
            });
        }
        nano.instances.footer.render();
    },
    
    profile: function() {
        if(nano.utils.loggedIn())
        {
            // Hide the Market Summary on the profile page
            if ( !nano.utils.isMobile() ){
                nano.utils.hideAll(false);
            } else {
                nano.utils.hideAll();
            }
            
            // Render the Navigation bar
            nano.instances.navbar.render(nano.conf.hash.profile);

            // Set the Account profile model with the profileid of the current user
            var model = new nano.models.AccountProfile({ profileid : nano.session.profileid });
            var accountModel = new nano.models.Account({accountid : nano.session.accountid});
            accountModel.fetch({
                success : function(accountModel, response){
                },
                error: function(){
                }
            });
            model.fetch({
                success : function() {
                    var data = {
                        fullname : model.get('fullname'),
                        email : model.get('email'),
                        lastlogin : model.get('lastlogin')
                    }
                    nano.instances.leftnavbar.render(data);
                    nano.instances.profile.render(model);
                },
                error : nano.utils.onApiError
            });
        }
        else {
            nano.instances.router.navigate(nano.conf.hash.login, true);
        }
        nano.instances.footer.render();
    },

    contact: function () {
        'use strict';
    	var contact = new nano.models.Contact();
        contact.fetch({
        	success : function () {
        		var jsonObj = contact.toJSON();
        		if (navigator.geolocation) {
        			navigator.geolocation.getCurrentPosition( function (position) {
        					var minDistance = Number.POSITIVE_INFINITY,
                                nearestOffice,
                                i,
                                distance;
        			        for (i=0; i < jsonObj.locations.length; i++) {
        			              distance = nano.utils.calculateDistance(position.coords.latitude,jsonObj.locations[i].latitude,position.coords.longitude,jsonObj.locations[i].longitude);
        			              if (minDistance > distance) {
        			                  minDistance = distance;
        			                  nearestOffice = jsonObj.locations[i].address;
        			      		}
        			      	}
        			        nano.strings.location = nearestOffice;
        		            nano.instances.contact.render();
        				},
        				function (error) {
        					nano.instances.contact.render();
                        });
        			} else {
                        nano.instances.contact.render();
        			}
        		},
        		error : function () {
        			nano.instances.contact.render();
        		}
        	});
        if (nano.utils.loggedIn()) {
            nano.utils.hideAll();
            nano.instances.navbar.render();
        } else {
            nano.utils.hideAll();
            nano.instances.navbar.renderLogin();
        }
        nano.instances.footer.render();
    },

    admin: function() {
        if(nano.utils.loggedIn()) {
            // Set the Account profile model with the profileid of the current user
            var profile = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            profile.fetch({
                success : function() {
                    // Render the leftnavbar
                    var data = {
                        fullname : profile.get('fullname'),
                        email : profile.get('email'),
                        lastlogin : profile.get('lastlogin')
                    }
                    nano.instances.leftnavbar.render(data);
                },
                error : nano.utils.onApiError
            });
            
            nano.utils.hideAll(false);
            nano.instances.navbar.render();
            nano.instances.admin.render();
        }
        else {
            nano.instances.router.navigate(nano.conf.hash.login, true);
        }
        nano.instances.footer.render();
    }
});

$(function(){
    nano.instances.router = new nano.Router();
    Backbone.history.start();
});
