nano.Controller = function(options) {

    if ( !_.isNull(options) )
    {
        nano.conf = options || conf;
    }

    this.run = function(){
        //Create instances of the views
        nano.instances.navbar = new nano.ui.Navbar($('#navbar'));
        nano.instances.login = new nano.ui.Login($('#login'));
        nano.instances.footer = new nano.ui.Footer($('#footer'));

        //Store the dom Object for the loading message div
        nano.containers.loading = $('#loading');

        //Hide the loading Message
        nano.containers.loading.hide();

        if(nano.utils.loggedIn()) {
            this.renderDashboard();
        }
        else
        {
            nano.instances.login.render();
        }

        nano.instances.footer.render();
    };

    this.renderDashboard = function(){
        nano.instances.navbar.render();
    };
};