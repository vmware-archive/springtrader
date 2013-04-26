Ext.define('SpringTrader.view.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',
    requires: ['Ext.field.Email', 'Ext.field.Password'],
    config: {
        title: 'Login',
        height: '100%',
        items: [
            { xtype: 'fieldset',
                items: [
                    { xtype: 'textfield', name: 'userid', placeHolder: 'Username'},
                    { xtype: 'passwordfield', name: 'passwd', placeHolder: 'Password'},
                    { xtype: 'container',
                        layout: { type: 'hbox', align: 'center', pack: 'center' },
                        items: [
                            { xtype: 'button', ui: 'cancel', text: 'Cancel', itemId: 'cancelButton' },
                            { xtype: 'button', ui: 'confirm', text: 'Login', itemId: 'submitButton' }
                        ]
                    }
                ]
            },
        ]
    }
});