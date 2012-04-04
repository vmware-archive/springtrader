nano.Controller = function(conf, strings) {

    if ( typeof conf != 'undefined' )
    {
        nano.conf = conf;
    }
    if ( typeof strings != 'undefined' )
    {
        nano.strings = strings;
    }

    this.run = function(){
        //Create instances of the views
        nano.instances.controller = this;
        nano.instances.navbar = new nano.ui.Navbar($('#navbar'));
        nano.instances.login = new nano.ui.Login($('#login'));
        nano.instances.marketSummary = new nano.ui.MarketSummary($('#market-summary'));
        nano.instances.footer = new nano.ui.Footer($('#footer'));
        nano.instances.portfolio = new nano.ui.Portfolio($('#portfolio'));
        nano.instances.userStatistics = new nano.ui.UserStatistics($('#user-statistics'));
        nano.instances.accountSummary = new nano.ui.AccountSummary($('#account-summary'));

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
                //=======================> FIX ME! Portfolio api call is all messed up, we need to figure that out first
                //nano.instances.portfolio.render();
            }
        };
        for (var i in models)
        {
            models[i].fetch({
                success : onFetchSuccess,
                error : function(model, error){
                    // What do we do?
                }
            });
        }
    };

    this.renderLogin = function() {
        nano.utils.hideAll();
        nano.instances.login.render();
    };
};