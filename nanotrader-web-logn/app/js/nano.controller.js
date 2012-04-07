/**
 * Class in charge of Managing the workflow of the app
 * @author Carlos Soto <carlos@lognllc.com>
 */
nano.Controller = function(conf, strings) {

    // Overwrite the configuration and the
    // language strings if sent as a parameter
    if ( typeof conf != 'undefined' )
    {
        nano.conf = _.extend(nano.conf, conf);
    }
    if ( typeof strings != 'undefined' )
    {
        nano.strings = _.extend(nano.strings, strings);
    }

    /**
     * It's the "main()" of our app
     * @author Carlos Soto <carlos@lognllc.com>
     * @return void
     */
    this.run = function() {
        //Create instances of the views
        nano.instances.controller = this;
        nano.instances.navbar = new nano.views.Navbar({ el : '#navbar'});
        nano.instances.footer = new nano.views.Footer({ el : '#footer'});

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
                nano.instances.marketSummary = new nano.views.MarketSummary({
                    el : '#market-summary',
                    model : model
                });
                nano.instances.marketSummary.render();

                // Render the Dashboard of logged in or the Login otherwise
                if(nano.utils.loggedIn()) {
                    nano.instances.controller.renderDashboard();
                }
                else
                {
                    nano.instances.controller.renderLogin();
                }
            },
            error : function(model, response){
                // Error message?
            }
        });
    };

    /**
     * Renders the dashboard on the main page
     * @author Carlos Soto <carlos@lognllc.com>
     * @return void
     */
    this.renderDashboard = function() {
        nano.utils.hideAll();
        nano.containers.loading.show();
        nano.instances.navbar.render();

        //Portfolio => holdingSummary
        //Positions => holding

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
                if (!nano.instances.accountSummary)
                {
                    nano.instances.accountSummary = new nano.views.AccountSummary({
                        el : '#account-summary',
                        model : models[0]
                    });
                }
                nano.instances.accountSummary.render();

                // Render the User Statistics View
                if (!nano.instances.userStatistics)
                {
                    nano.instances.userStatistics = new nano.views.UserStatistics({
                        el : '#user-statistics',
                        model : models[0]
                    });
                }
                nano.instances.userStatistics.render();

                // Render the Portfolio View
                if (!nano.instances.Portfolio)
                {
                    nano.instances.portfolio = new nano.views.Portfolio({
                        el : '#portfolio',
                        model : models[1] //==> HoldingSummary Model
                    });
                }
                nano.instances.portfolio.render();

                /*
                // Render the Positions View
                if (!nano.instances.Positions)
                {
                    nano.instances.positions = new nano.views.Positions({
                        el : '#positions',
                        model : models[2] //==> Holdings Collection
                    });
                }
                nano.instances.positions.render();
                */
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
                            nano.instances.controller.renderLogin('sessionExpired');
                            break;
                        default:
                            // Error Message!
                            alert('An unknown error has occured, please try again later.');
                            break;
                    }
                }
            });
        }
    };

    /**
     * Renders the Login Page
     * @author Carlos Soto <carlos@lognllc.com>
     * @return void
     */
    this.renderLogin = function(errorKey) {
        nano.utils.hideAll();
        if ( !nano.instances.login)
        {
            nano.instances.login = new nano.views.Login({el : '#login'});
        }
        nano.instances.login.render(errorKey);
    };
};