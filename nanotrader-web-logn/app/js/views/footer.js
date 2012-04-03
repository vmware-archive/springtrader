// HTML template
nano.templates.footer = '<div class="container clearfix">\
                            <p class="pull-left"><%= translate("copyright") %></p>\
                            <ul class="nav pull-left">\
                                <li><a id="contact-us">Contact Us</a> <span class="divider">|</span></li>\
                                <li><a class="help">Help</a> </li>\
                            </ul>\
                        </div>';

nano.ui.Footer = function(element) {
    this.element = element;
    nano.containers.footer = element;
    this.render = function() {
        var footer = _.template(nano.templates.footer)({});
        this.element.html(footer);
    };
};
