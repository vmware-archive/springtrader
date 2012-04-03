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

        //Store the dom Object for the loading message div.
        nano.containers.loading = $('#loading');

        // Render the footer since it's always shown.
        nano.instances.footer.render();

        //The first thing we need to do first is to render 
        // the Market Summary, since it's shown on every page.
        nano.instances.marketSummary.render(function(){
            if(nano.utils.loggedIn()) {
                nano.instances.controller.renderDashboard();
            }
            else
            {
                nano.instances.controller.renderLogin();
            }
        });
    };

    this.renderDashboard = function() {
        nano.utils.hideAll();
        nano.containers.loading.show();
        nano.instances.navbar.render();
    };

    this.renderLogin = function() {
        nano.utils.hideAll();
        nano.instances.login.render();
    };
};