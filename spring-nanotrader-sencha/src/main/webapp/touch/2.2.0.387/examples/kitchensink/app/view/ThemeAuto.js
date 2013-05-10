Ext.define('Kitchensink.view.ThemeAuto', {
    extend: 'Ext.Component',
    constructor: function() {
        this.callParent();
        window.location.assign(location.pathname);
    }
});
