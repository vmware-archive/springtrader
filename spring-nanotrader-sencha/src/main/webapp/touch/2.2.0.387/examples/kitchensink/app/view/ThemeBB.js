Ext.define('Kitchensink.view.ThemeBB', {
    extend: 'Ext.Component',
    constructor: function() {
        this.callParent();
        window.location.assign(location.pathname + '?platform=blackberry');
    }
});
