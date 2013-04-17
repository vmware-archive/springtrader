Ext.define('SpringTrader.view.SignupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'signupPage',
    config: {
        title: 'Sign up Form',
        items: [
            { xtype: 'textfield', name: 'name', placeHolder: 'Full Name'},
            { xtype: 'emailfield', name: 'email', placeHolder: 'email@vmware.com' },
            { xtype: 'passwordfield', name: 'password', placeHolder: 'Password'},
            { xtype: 'passwordfield', name: 'confirmpassword', placeHolder: 'Confirm Password'},
            { xtype: 'textfield', name: 'username', placeHolder: 'Username'},
            { xtype: 'numberfield', name: 'openbalance', placeHolder: 'Opening balance', minValue: 100000, stepValue: 1000},
            { xtype: 'numberfield', name: 'creditcardnum', value: '1234123412341234', disabled: true},
            { xtype: 'button', ui: 'confirm', text: 'Submit'}
        ]
    }
});