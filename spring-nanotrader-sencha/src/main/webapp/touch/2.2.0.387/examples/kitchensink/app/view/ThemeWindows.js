Ext.define('Kitchensink.view.ThemeWindows', {
    extend: 'Ext.Component',
    constructor: function() {
        this.callParent();
        window.location.assign(location.pathname + '?platform=ie10');
    }
});
