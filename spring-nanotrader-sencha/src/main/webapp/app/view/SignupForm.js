Ext.define('SpringTrader.view.SignupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'signupPage',
    requires: ['Ext.field.Email', 'Ext.field.Password', 'Ext.field.Number'],
    config: {
        title: 'Sign up Form',
        items: [
            { xtype: 'textfield', name: 'fullname', placeHolder: 'Full Name'},
            { xtype: 'emailfield', name: 'email', placeHolder: 'email@vmware.com' },
            { xtype: 'passwordfield', name: 'passwd', placeHolder: 'Password'},
            { xtype: 'passwordfield', name: 'passwdconfirm', placeHolder: 'Confirm Password'},
            { xtype: 'textfield', name: 'userid', placeHolder: 'Username'},
            { xtype: 'numberfield', name: 'openbalance', placeHolder: 'Opening balance', minValue: 100000, stepValue: 1000},
            { xtype: 'numberfield', name: 'creditcard', value: '1234123412341234', disabled: true},
            { xtype: 'textfield', name: 'address', placeHolder: 'Address' },
            { xtype: 'button', ui: 'confirm', text: 'Submit', itemId: 'signupSubmitBtn'}
        ]
    }
});