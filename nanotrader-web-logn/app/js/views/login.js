// HTML template
nano.templates.login = '';

nano.ui.Login = function(element) {
    this.element = element;
    nano.containers.login = element;

    this.render = function() {
        alert('login render');
        /*
        var data = {};
        var login = _.template(nano.templates.login)(data);
        this.element.html(login);
        */
    };
};
