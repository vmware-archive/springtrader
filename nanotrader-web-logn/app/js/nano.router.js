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
        "dashboard/p:page" : "orders",  // #dashboard - pagination of List of Orders
        ""              : "dashboard", // #dashboard page
        "registration"  : "registration", // #registration page
        "portfolio"     : "portfolio", // #portfolio page
        "portfolio/p:page" : "holdings", // #portolio - pagination of List of Holdings
        "trade"         : "trade", // #trade page
        "trade/p:page"  : "orders", // #trade - pagination of List of Orders
        "trade/q:quote" : "quotes", // #trade - list of quotes
        "profile"       : "profile", // #profile page
        "contact"       : "contact", // #contact page
        "overview"      : "overview" // #overview page
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
        nano.instances.holdings = new nano.views.Holdings({el: '#nc-holdings'});
        nano.instances.profile = new nano.views.Profile({el : '#nc-profile'});
        nano.instances.contact = new nano.views.Contact({el: '#nc-contact'});
        nano.instances.trade = new nano.views.Trade({el : '#nc-trade'});
        nano.instances.quotes = new nano.views.Quotes({el : '#nc-quotes'});
        nano.instances.orders = new nano.views.Orders({el: '#nc-orders'});
        nano.instances.help = new nano.views.Help({el : '#nc-help'});
        nano.instances.overview = new nano.views.Overview({el: '#nc-overview'});

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
        if(nano.utils.loggedIn()){
            nano.utils.hideAll(false);
            // Render the navbar
            nano.instances.navbar.render();
            nano.instances.help.render();
        } else {
            nano.utils.hideAll(false);
            nano.instances.help.render();
        }
    },

    overview: function() {
        if(nano.utils.loggedIn()){
            nano.utils.hideAll(false);
            // Render the navbar
            nano.instances.navbar.render();
            nano.instances.overview.render();
        } else {
            nano.utils.hideAll(false);
            nano.instances.overview.render();
        }
    },

    dashboard: function(page) {
        if (isNaN(page)){
            page = 1;
        }
        // Render the Dashboard of logged in or the Login otherwise
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            nano.containers.loading.show();
            nano.instances.navbar.render();

            var modelCount = 0;
            var models = {
                account : new nano.models.Account({accountid : nano.session.accountid}),
                holdingSummary : new nano.models.HoldingSummary({ accountid : nano.session.accountid }),
                portfolioSummary : new nano.models.PortfolioSummary({ accountid : nano.session.accountid }),
                orders : new nano.models.Orders({ accountid : nano.session.accountid }),
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
                    
                    // Show the toggle control on the dashboard
                    nano.instances.orders.options.showToggle = true;
                    // Render the Orders View
                    nano.instances.orders.render(models.orders, page, nano.conf.hash.dashboardWithPage);
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

    portfolio: function(page) {
        if (isNaN(page))
        {
            page = 1;
        }
        if(nano.utils.loggedIn())
        {
            nano.utils.hideAll();
            nano.containers.loading.show();
            nano.instances.navbar.render(nano.conf.hash.portfolio);

            var modelCount = 0;
            var models = {
                account : new nano.models.Account({accountid : nano.session.accountid}),
                portfolioSummary : new nano.models.PortfolioSummary({ accountid : nano.session.accountid }),
                holdings : new nano.models.Holdings({ accountid : nano.session.accountid })
            };

            var onFetchSuccess = function() {
                if (++modelCount == _.keys(models).length)
                {
                    nano.containers.loading.hide();

                    // Render the Portfolio View
                    nano.instances.portfolio.render(models.account, models.portfolioSummary);

                    // Render the Portfolio Summary View
                    nano.instances.portfolioSummary.render(models.portfolioSummary);

                    // Render the List of Holdings View
                    nano.instances.holdings.render(models.holdings, page);

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

    holdings: function (page) {
        if (isNaN(page))
        {
            page = 1;
        }
        if (!nano.containers.holdings.html())
        {
            this.portfolio(page);
        }
        else
        {
            // Render the List of Holdings View
            nano.instances.holdings.render(null, page);
        }
    },

    trade: function(page) {
        if (isNaN(page)){
            page = 1;
        }
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            nano.containers.loading.show();
            nano.instances.navbar.render(nano.conf.hash.trade);
            
            var model = new nano.models.Orders({ accountid : nano.session.accountid });
            
            var onFetchSuccess = function() {
                nano.containers.loading.hide();
                
                // Render the trade view
                nano.instances.trade.render(model);
                
                // Show the toggle control on the dashboard
                nano.instances.orders.options.showToggle = false;
                
                // Render the List of Orders View
                nano.instances.orders.render(model, page, nano.conf.hash.tradeWithPage);
                
                // Render the List of Quotes View
                nano.instances.quotes.render();
            };
            
            model.fetch({
                success : onFetchSuccess,
                error: nano.utils.onApiErreor
            });
        }
        else {
            nano.utils.goTo( nano.conf.hash.login );
        }
    },
    
    orders: function(page) {
        if (isNaN(page)){
            page = 1;
        }
        if (!nano.containers.orders.html()){
            this.trade(page);
        }
        else {
            // Render the List of Orders View
            nano.instances.orders.render(null, page);
        }
    },
    
    quotes: function(quote) {
        if (!nano.containers.quotes.html()){
            this.trade();
        }
        else {
            var model = new nano.models.Quotes({ quoteid : quote });
            
            var onFetchSuccess = function() {
                // Render the quotes list
                nano.instances.quotes.render(model, quote);
                nano.instances.trade.error(false)
            };
        
            var onError = function() {
                nano.instances.trade.error(true)
            };
            
            model.fetch({
                success : onFetchSuccess,
                error: onError
            });
        }
    },
    
    profile: function() {
        if(nano.utils.loggedIn())
        {
            nano.utils.hideAll(false);
            // Hide the Market Summary on the profile page
            nano.instances.navbar.render();

            // Set the Account profile model with the profileid of the current user
            var model = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            model.fetch({
                success : function() {
                nano.instances.profile.render(model);
            },
                error : nano.utils.onApiErreor
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
