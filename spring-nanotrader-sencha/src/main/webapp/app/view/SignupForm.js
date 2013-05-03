Ext.define('SpringTrader.view.SignupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'signupform',
    requires: ['Ext.field.Email', 'Ext.field.Password', 'Ext.field.Number'],
    config: {
        title: 'Sign up',
        height: '100%',
        items: [
            { xtype: 'fieldset',
                items: [
                    { xtype: 'textfield', name: 'fullname', placeHolder: 'Name', autoCorrect: false },
                    { xtype: 'emailfield', name: 'email', placeHolder: 'Email address' },
                    { xtype: 'passwordfield', name: 'passwd', placeHolder: 'Password'},
                    { xtype: 'passwordfield', name: 'passwdconfirm', placeHolder: 'Confirm password'},
                    { xtype: 'textfield', name: 'userid', placeHolder: 'Username', autoCapitalize: false, autoCorrect: false},
                    { xtype: 'numberfield', name: 'openbalance', placeHolder: 'Opening balance', minValue: 100000, stepValue: 1000},
                    { xtype: 'textfield', name: 'address', placeHolder: 'Address' }
                ]
            },
            { xtype: 'container',
                layout: { type: 'hbox', align: 'center', pack: 'center' },
                items: [
                    { xtype: 'button', ui: 'cancel', text: 'Cancel', itemId: 'cancelButton', margin: '0 10 0 10' },
                    { xtype: 'button', ui: 'confirm', text: 'Sign up', itemId: 'signupSubmitButton', margin: '0 10 0 10' }
                ]
            }
        ]
    }
});