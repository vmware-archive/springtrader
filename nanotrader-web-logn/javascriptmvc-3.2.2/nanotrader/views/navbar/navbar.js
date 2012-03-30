steal(
    './navbar.css',
    '//jquery/view/ejs/ejs.js',                             // enables the EJS templates
    '//jquery/controller/controller.js',                    // enables the jQuery Controller library
    function () {
        $.Controller("ui.Navbar", {
            defaults: {}
        },
        {
            /**
            * Initializes the object
            * @author Carlos Soto <carlos.soto@lognllc.com>
            * @return void
            */
            init: function () {},

            /**
            * Creates the Navigation Bar
            * @author Carlos Soto <carlos.soto@lognllc.com>
            * @return void
            */
            render: function () {
                var data = { 
                    email: 'carlos.soto@lognllc.com',
                    username: 'Carlos Soto'
                };
                var navbar = $.View('//nanotrader/views/navbar/navbar.ejs', data);
                this.element.html(navbar);
                this.element.find('.dropdown-toggle').dropdown();
            }
        });
    }
);