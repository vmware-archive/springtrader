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
        nano.instances.navbar = new nano.views.Navbar($('#navbar'));
        nano.instances.login = new nano.views.Login($('#login'));
        nano.instances.marketSummary = new nano.views.MarketSummary($('#market-summary'));
        nano.instances.footer = new nano.views.Footer($('#footer'));
        nano.instances.portfolio = new nano.views.Portfolio($('#portfolio'));
        nano.instances.userStatistics = new nano.views.UserStatistics($('#user-statistics'));
        nano.instances.accountSummary = new nano.views.AccountSummary($('#account-summary'));

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
                nano.instances.accountSummary.render(models[0]);
                nano.instances.userStatistics.render(models[0]);
                //=======================> FIX ME! HoldingSummary api call is all messed up, we need to figure that out first
                //nano.instances.portfolio.render(models[1]); // uses the HoldingSummary Model
                //nano.instances.positions.render(models[12); // uses the Holdings Collection
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
        nano.instances.login.render(errorKey);
    };
};