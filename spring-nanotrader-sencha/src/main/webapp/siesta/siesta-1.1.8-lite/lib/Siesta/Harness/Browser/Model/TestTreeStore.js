/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.Model.TestTreeStore', {
    extend          : 'Ext.data.TreeStore',
    
    mixins          : [
        'Sch.data.mixin.FilterableTreeStore'
    ],
    
    
    constructor     : function () {
        this.callParent(arguments)
        
        this.initTreeFiltering()
    }

})