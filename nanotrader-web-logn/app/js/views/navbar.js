// HTML template
nano.templates.navbar = '<div class="navbar navbar-fixed-top">\
                            <div class="navbar-inner">\
                                <div class="container">\
                                    <a class="logo brand"><%= translate("nanotrader") %></a>\
                                    <div class="nav-collapse">\
                                        <ul class="nav nav-top">\
                                            <li class="divider-vertical"></li>\
                                            <li class="active"><a><span class="icon-home icon-white"></span><%= translate("dashboard") %></a></li>\
                                            <li class="divider-vertical"></li>\
                                            <li><a><span class="icon-custom icon-portfolio"></span><%= translate("portfolio") %></a></li>\
                                            <li class="divider-vertical"></li>\
                                            <li><a><span class="icon-custom icon-trade"></span><%= translate("trade") %></a></li>\
                                            <li class="divider-vertical"></li>\
                                        </ul>\
                                        <div class="navbar-text pull-right">\
                                            <ul class="nav">\
                                                <li class="divider-vertical"></li>\
                                                <li class="dropdown" id="fat-menu"><a class="dropdown-toggle pull-right" data-toggle="dropdown">\
                                                        <span class="icon-custom icon-user"></span>\
                                                        <span><%= email %></span>\
                                                        <span class="icon-down-arrow"></span>\
                                                    </a>\
                                                    <div class="dropdown-menu">\
                                                        <p class="user-title"><%= username %></p>\
                                                        <p><%= email %></p>\
                                                        <ul class="dropdown-nav">\
                                                            <li><a id="profile"><%= translate("profile") %></a></li>\
                                                            <li><a class="help"><%= translate("help") %></a></li>\
                                                            <li class="divider"></li>\
                                                            <li><a id="logout"><%= translate("logout") %></a></li>\
                                                        </ul>\
                                                    </div>\
                                                </li>\
                                                <li class="divider-vertical"></li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';

nano.ui.Navbar = function(element) {
    this.element = element;
    nano.containers.navbar = element;

    this.render = function(){
        var data = { 
            email: 'carlos.soto@lognllc.com',
            username: 'Carlos Soto'
        };
        var navbar = _.template(nano.templates.navbar)(data);
        this.element.html(navbar);
        this.element.find('.dropdown-toggle').dropdown();
    };
};
