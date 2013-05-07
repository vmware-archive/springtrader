Ext.define('SpringTrader.view.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    requires: ['Ext.field.Email', 'Ext.field.Password', 'Ext.form.FieldSet'],
    config: {
        title: 'Login',
        height: '100%',
        items: [
            { xtype: 'fieldset',
                items: [
                    { xtype: 'textfield', name: 'userid', placeHolder: 'Username', autoCapitalize: false, autoCorrect: false},
                    { xtype: 'passwordfield', name: 'passwd', placeHolder: 'Password'}
                ]
            },
            { xtype: 'container',
                layout: { type: 'hbox', align: 'center', pack: 'center' },
                items: [
                    { xtype: 'button', ui: 'cancel', text: 'Cancel', itemId: 'cancelButton', margin: '0 10 0 10' },
                    { xtype: 'button', ui: 'confirm', text: 'Login', itemId: 'submitButton', margin: '0 10 0 10' }
                ]
            }
        ]
    }
});