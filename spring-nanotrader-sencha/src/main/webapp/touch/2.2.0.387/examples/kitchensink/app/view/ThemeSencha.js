Ext.define('Kitchensink.view.ThemeSencha', {
    extend: 'Ext.Component',
    constructor: function() {
        this.callParent();
        window.location.assign(location.pathname + '?platform=chrome');
    }
});
