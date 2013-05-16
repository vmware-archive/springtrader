Ext.define('SpringTrader.view.UserFields', {
    extend: 'Ext.form.FieldSet',
    xtype: 'userfields',
    requires: ['Ext.field.Email', 'Ext.field.Password', 'SpringTrader.field.Number' ],
    config: {
        items: [
            { xtype: 'textfield', name: 'fullname', placeHolder: 'Name', autoCorrect: false },
            { xtype: 'emailfield', name: 'email', placeHolder: 'Email address' },
            { xtype: 'passwordfield', name: 'passwd', placeHolder: 'Password'},
            { xtype: 'passwordfield', name: 'passwdconfirm', placeHolder: 'Confirm password'},
            { xtype: 'textfield', name: 'userid', placeHolder: 'Username', autoCapitalize: false, autoCorrect: false},
            { xtype: 'stnumberfield', name: 'openbalance', placeHolder: 'Opening balance'},
            { xtype: 'textfield', name: 'address', placeHolder: 'Address' }
        ]
    }
});