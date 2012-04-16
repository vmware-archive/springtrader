/** 
 * Router class for the application: http://documentcloud.github.com/backbone/#Router
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.Router = Backbone.Router.extend({

    /** 
     * Maps the functions to the urls
     * @author Carlos Soto <carlos.soto@lognllc.com>
     */
    routes: {
        "help"          : "help",    // #help
        "login/:error"  : "login",    // #login page
        "login"         : "login",    // #login page
        "dashboard"     : "dashboard",   // #dashboard page
        ""              : "dashboard", // #dashboard page
        "registration"  : "registration", // #registration page
        "portfolio"     : "portfolio", // #portfolio page
        "trade"         : "trade", // #trade page
        "profile"       : "profile", // #profile page
        "contact"       : "contact" // #contact page
    },

    initialize: function() {
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
        nano.instances.profile = new nano.views.Profile({el : '#nc-profile'});
        nano.instances.contact = new nano.views.Contact({el: '#nc-contact'});
        // new trade page view
        nano.instances.trade = new nano.views.Trade({el : '#nc-trade'});

        //Store the dom Object for the loading message div.
        nano.containers.loading = $('#nc-loading');

        // Render the footer since it's always shown.
        nano.instances.footer.render();

        // The first thing we need to do first is to render 
        // the Market Summary, since it's shown on every page.
        var marketSummary = new nano.models.MarketSummary();
        marketSummary.fetch({
            success : function(model, response){
                // Hide the loading Message
                nano.containers.loading.hide();

                // Render the Market Summary with the newly fetched info
                nano.instances.marketSummary.render(model);
            },
            error : function(model, response){
                // Error message?
            }
        });

        // Create an interval to update the Market Summary section every X amount of time
        window.setInterval(function(){
            marketSummary.fetch({
                success : function(model, response){
                    nano.instances.marketSummary.update(model);
                }
            });
       },
       nano.conf.marketSummaryUpdateMillisecs);
    },

    help: function() {
        alert('Help goes here!');
    },

    dashboard: function() {
        // Render the Dashboard of logged in or the Login otherwise
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            nano.containers.loading.show();
            nano.instances.navbar.render();

            var modelCount = 0;
            var models = {
                account : new nano.models.Account({accountid : nano.session.accountid}),
                //accountProfile : new nano.models.AccountProfile({ profileid : nano.session.profileid }),
                holdingSummary : new nano.models.HoldingSummary({ accountid : nano.session.accountid }),
                portfolioSummary : new nano.models.PortfolioSummary({ accountid : nano.session.accountid }),
                //holdings : new nano.models.Holdings({ accountid : nano.session.accountid })
            };

            var onFetchSuccess = function() {
                if (++modelCount == _.keys(models).length)
                {
                    nano.containers.loading.hide();

                    // Render the User Statistics View
                    nano.instances.userStatistics.render(models.account);

                    // Render the Account Summary View
                    nano.instances.accountSummary.render(models.account, models.portfolioSummary);

                    // Render the Portfolio View
                    nano.instances.portfolio.render(models.account, models.portfolioSummary);

                    // Render the Positions View
                    nano.instances.positions.render(models.holdingSummary);
                }
            };
            for (var i in models)
            {
                models[i].fetch({
                    success : onFetchSuccess,
                    error : nano.utils.onApiError
                });
            }
        }
        else
        {
            nano.utils.goTo( nano.conf.hash.login );
        }
    },

    login: function(error) {
        if(nano.utils.loggedIn()) {
            nano.utils.goTo( nano.conf.hash.dashboard );
        }
        else {
            nano.utils.hideAll();
            nano.instances.login.render(error);
        }
    },
    
    registration: function(error){
        if(nano.utils.loggedIn()) {
            nano.utils.goTo( nano.conf.hash.dashboard );
        }
        else {
            nano.utils.hideAll();
            nano.instances.registration.render(error);
        }
    },

    portfolio: function() {
        if(nano.utils.loggedIn())
        {
            nano.utils.hideAll();
            nano.containers.loading.show();
            nano.instances.navbar.render(nano.conf.hash.portfolio);

            var modelCount = 0;
            var models = {
                account : new nano.models.Account({accountid : nano.session.accountid}),
                portfolioSummary : new nano.models.PortfolioSummary({ accountid : nano.session.accountid }),
                //holdings : new nano.models.Holdings({ accountid : nano.session.accountid })
            };

            var onFetchSuccess = function() {
                if (++modelCount == _.keys(models).length)
                {
                    nano.containers.loading.hide();

                    // Render the Portfolio View
                    nano.instances.portfolio.render(models.account, models.portfolioSummary);

                    // Render the Portfolio Summary View
                    nano.instances.portfolioSummary.render(models.portfolioSummary);

                }
            };
            for (var i in models)
            {
                models[i].fetch({
                    success : onFetchSuccess,
                    error : nano.utils.onApiError
                });
            }
        }
        else {
            nano.utils.goTo( nano.conf.hash.login );
        }
    },

    trade: function() {
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            nano.containers.loading.show();
            nano.instances.navbar.render(nano.conf.hash.trade);
            
            var orders = new nano.models.Orders({ accountid : nano.session.accountid });
            
            var onFetchSuccess = function() {
                nano.containers.loading.hide();
                
                // render the trade view
                nano.instances.trade.render(orders);
            };
            
            orders.fetch({
                success : onFetchSuccess,
                error: nano.utils.onApiError
            });
        }
        else {
            nano.utils.goTo( nano.conf.hash.login );
        }
    },
    
    profile: function() {
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            // Hide the Market Summary on the profile page
            nano.containers['marketSummary'].hide();
            nano.instances.navbar.render();
            // Set the Account profile model with the profileid of the current user
            var model = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            
            var onFetchSuccess = function() {
                nano.instances.profile.render(model);
            }
            
            model.fetch({
                success : onFetchSuccess,
                error : function(error){
                    alert('An unknown error has occured, please try again later.');
                }
            });
        }
        else {
            nano.utils.goTo( nano.conf.hash.login );
        }
    },
    
    contact: function() {
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            nano.instances.navbar.render();
            nano.instances.contact.render();
        }
        else {
            nano.utils.hideAll();
            nano.instances.contact.render();
        }        
    }
});

$(function(){
    nano.instances.router = new nano.Router();
    Backbone.history.start();
});
