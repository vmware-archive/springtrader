
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
        ""              : "dashboard" // #dashboard page
    },

    initialize: function() {
        nano.instances.navbar = new nano.views.Navbar({ el : '#navbar'});
        nano.instances.footer = new nano.views.Footer({ el : '#footer'});
        nano.instances.marketSummary = new nano.views.MarketSummary({el : '#market-summary'});
        nano.instances.accountSummary = new nano.views.AccountSummary({el : '#account-summary'});
        nano.instances.userStatistics = new nano.views.UserStatistics({el : '#user-statistics'});
        nano.instances.portfolio = new nano.views.Portfolio({el : '#portfolio'});
        nano.instances.login = new nano.views.Login({el : '#login'});
        //nano.instances.positions = new nano.views.Positions({el : '#positions'});

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
                nano.instances.marketSummary.setModel(model);
                nano.instances.marketSummary.render();
            },
            error : function(model, response){
                // Error message?
            }
       });
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
            var models = [
                new nano.models.Account({accountid : nano.session.accountid}),
                new nano.models.HoldingSummary({ accountid : nano.session.accountid }),
                new nano.models.Holdings({ accountid : nano.session.accountid })
            ];

            var onFetchSuccess = function() {
                if (++modelCount == models.length)
                {
                    nano.containers.loading.hide();

                    // Render the Account Summary View
                    nano.instances.accountSummary.render(models[0]); //==> Account Model

                    // Render the User Statistics View
                    nano.instances.userStatistics.render(models[0]); //==> Account Model

                    // Render the Portfolio View
                    nano.instances.portfolio.render(models[1]); //==> HoldingSummary Model

                    // Render the Positions View
                    //nano.instances.positions.render(models[2]); //==> Holdings Collection
                }
            };
            for (var i in models)
            {
                models[i].fetch({
                    success : onFetchSuccess,
                    error : function(model, error){
                        // What do we do?
                        console.log(error);
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
    }
});

$(function(){
    nano.instances.router = new nano.Router();
    Backbone.history.start();
});