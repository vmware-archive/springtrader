Ext.define('SpringTrader.view.SignupButton', {
    extend: 'Ext.Container',
    xtype: 'signupbutton',
    config: {
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [
            {xtype: 'component', cls: 'centered', html: "Don't have a SpringTrader account?<br/>Create one now.", styleHtmlContent: true},
            {xtype: 'button', text: "Sign up!", ui: 'confirm', itemId: 'showSignupFormButton'}
        ]
    }
});