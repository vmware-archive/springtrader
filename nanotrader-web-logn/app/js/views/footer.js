/**
 * HTML template for the Footer
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
 nano.templates.footer = '<div class="container clearfix">\
                            <p class="pull-left"><%= translate("copyright") %></p>\
                            <ul class="nav pull-left">\
                                <li><a id="contact-us">Contact Us</a> <span class="divider">|</span></li>\
                                <li><a class="help">Help</a> </li>\
                            </ul>\
                        </div>';

/**
 * View class for the Footer
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.Footer = function(element) {
    this.element = element;
    nano.containers.footer = element;

    /**
     * Renders the Footer View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @return void
     */
    this.render = function() {
        var footer = _.template(nano.templates.footer)({});
        this.element.html(footer);
    };
};
