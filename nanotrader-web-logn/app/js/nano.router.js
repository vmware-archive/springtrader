
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
        "registration"  : "registration" // #registration page
    },

    initialize: function() {
        nano.instances.navbar = new nano.views.Navbar({ el : '#navbar'});
        nano.instances.footer = new nano.views.Footer({ el : '#footer'});
        nano.instances.marketSummary = new nano.views.MarketSummary({el : '#market-summary'});
        nano.instances.accountSummary = new nano.views.AccountSummary({el : '#account-summary'});
        nano.instances.userStatistics = new nano.views.UserStatistics({el : '#user-statistics'});
        nano.instances.portfolio = new nano.views.Portfolio({el : '#portfolio'});
        nano.instances.login = new nano.views.Login({el : '#login'});
<<<<<<< HEAD
        nano.instances.registration = new nano.views.Registration({el : '#registration'});
        
        //nano.instances.positions = new nano.views.Positions({el : '#positions'});
=======
        nano.instances.positions = new nano.views.Positions({el : '#positions'});
>>>>>>> origin/master

        //Store the dom Object for the loading message div.
        nano.containers.loading = $('#loading');

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
                accountProfile : new nano.models.AccountProfile({ profileid : nano.session.profileid }),
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
                    nano.instances.accountSummary.render(models.accountProfile);

                    // Render the Portfolio View
                    nano.instances.portfolio.render(models.portfolioSummary, models.account);

                    // Render the Positions View
                    nano.instances.positions.render(models.holdingSummary);
                }
            };
            for (var i in models)
            {
                models[i].fetch({
                    success : onFetchSuccess,
                    error : function(model, error){
                        // What do we do?
                        switch( error.status ) {
                            case 403:
                                nano.utils.logout();
                                nano.utils.goTo( nano.conf.hash.login + '/sessionExpired' );
                                break;
                            default:
                                // Error Message!
                                alert('An unknown error has occured, please try again later.');
                                break;
                        }
                    }
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
    }
});

$(function(){
    nano.instances.router = new nano.Router();
    Backbone.history.start();
});
