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
        "trade/q:quote/:random" : "quotes", // #trade - list of quotes
        "profile"       : "profile", // #profile page
        "contact"       : "contact", // #contact page
        "admin"         : "admin", // #admin page
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
        nano.instances.admin = new nano.views.Admin({el: '#nc-admin'});
        // Left navbar for profile, overview, help and admin
        nano.instances.leftnavbar = new nano.views.Leftnavbar({el : '#nc-leftnavbar'});

        //Store the dom Object for the loading message div.
        nano.containers.loading = $('#nc-loading');

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
            // Set the Account profile model with the profileid of the current user
            var profile = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            profile.fetch({
                success : function() {
                    // Render the leftnavbar
                    var data = {
                        fullname : profile.get('fullname'),
                        email : profile.get('email')
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
                        email : profile.get('email')
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

                    if ( !nano.utils.isMobile() )
                    {
                        // Render the Positions View
                        nano.instances.positions.render(models.holdingSummary);
                    }

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
        nano.instances.footer.render();
    },

    login: function(error) {
        if(nano.utils.loggedIn()) {
            nano.utils.goTo( nano.conf.hash.dashboard );
        }
        else {
            nano.utils.hideAll();
            nano.instances.login.render(error);
        }
        nano.instances.footer.render();
    },
    
    registration: function(error){
        if(nano.utils.loggedIn()) {
            nano.utils.goTo( nano.conf.hash.dashboard );
        }
        else {
            nano.utils.hideAll();
            nano.instances.registration.render(error);
        }
        nano.instances.footer.render();
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
                holdings : new nano.models.Holdings({ accountid : nano.session.accountid, page:page })
            };

            var onFetchSuccess = function() {
                if (++modelCount == _.keys(models).length)
                {
                    nano.containers.loading.hide();

                    if( !nano.utils.isMobile() ) {
                        // Render the Portfolio View
                        nano.instances.portfolio.render(models.account, models.portfolioSummary);
                    }

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
        nano.instances.footer.render();
    },

    holdings: function (page) {
        if (isNaN(page))
        {
            page = 1;
        }
        if ( !nano.containers.holdings.html() )
        {
            this.portfolio(page);
        }
        else
        {
            // Hide the loading Message
            nano.containers.loading.show();
            nano.containers.holdings.hide();

            // Fetch the info for the Holdings page we need
            var holdings = new nano.models.Holdings({ accountid : nano.session.accountid });
            holdings.fetch({
                data : {
                    page : page
                },
                success : function(model, response){
                    // Hide the loading Message
                    nano.containers.loading.hide();

                    // Render the Holdings with the newly fetched info
                    nano.instances.holdings.render(model, page);
                },
                error : nano.utils.onApiError
            });
        }
        nano.instances.footer.render();
    },

    trade: function(page, quote) {
        if (isNaN(page)){
            page = 1;
        }
        if(nano.utils.loggedIn()) {
            nano.utils.hideAll();
            // Hide the loading Message
            nano.containers.loading.show();
            nano.instances.navbar.render(nano.conf.hash.trade);
            
            var model = new nano.models.Orders({ accountid : nano.session.accountid });
            
            var onFetchSuccess = function() {
                nano.containers.loading.hide();
                
                // Render the trade view
                nano.instances.trade.render(model);
                
                // Render the List of Orders View
                nano.instances.orders.render(model, page, nano.conf.hash.tradeWithPage);
                
                // Render the Quotes View
                if (quote){
                    nano.instances.quotes.render();

                    // Fetch the info for the given quote symbol
                    var quotes = new nano.models.Quote({ quoteid : quote });
            
                    quotes.fetch({
                        success : function(quotes, response){
                            // Render the quote
                            nano.instances.quotes.render(quotes, quote);
                            nano.instances.trade.error(false)
                        },
                        error: function(){
                            nano.instances.trade.error(true);
                        }
                    });
                } else {
                    nano.instances.quotes.render();
                }
            };
            
            // Fetch the info for the Orders page we need
            model.fetch({
                data : {
                    page : page
                },
                success : onFetchSuccess,
                error: nano.utils.onApiError
            });
        }
        else {
            nano.utils.goTo( nano.conf.hash.login );
        }
        nano.instances.footer.render();
    },
    
    orders: function(page) {
        if (isNaN(page)){
            page = 1;
        }
        
        if (!nano.containers.orders.html() ){
            if (location.hash.indexOf('trade') != -1){
                this.trade(page);
            }
            if (location.hash.indexOf('dashboard') != -1){
                this.dashboard(page);
            }
        }
        else {
            // Hide the loading Message
            nano.containers.loading.show();
            nano.containers.orders.hide();

            // Fetch the info for the Orders page we need
            var orders = new nano.models.Orders({ accountid : nano.session.accountid });
            orders.fetch({
                data : {
                    page : page
                },
                success : function(model, response){
                    // Hide the loading Message
                    nano.containers.loading.hide();

                    // Render the Orders with the newly fetched info
                    nano.instances.orders.render(model, page);
                },
                error : nano.utils.onApiError
            });
        }
        nano.instances.footer.render();
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
            nano.instances.navbar.render();

            // Set the Account profile model with the profileid of the current user
            var model = new nano.models.AccountProfile({ profileid : nano.session.profileid })
            model.fetch({
                success : function() {
                    var data = {
                        fullname : model.get('fullname'),
                        email : model.get('email')
                    }
                    nano.instances.leftnavbar.render(data);
                    nano.instances.profile.render(model);
                },
                error : nano.utils.onApiError
            });
        }
        else {
            nano.utils.goTo( nano.conf.hash.login );
        }
        nano.instances.footer.render();
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
                        email : profile.get('email')
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
            nano.utils.goTo( nano.conf.hash.login );
        }
        nano.instances.footer.render();
    }
});

$(function(){
    nano.instances.router = new nano.Router();
    Backbone.history.start();
});
