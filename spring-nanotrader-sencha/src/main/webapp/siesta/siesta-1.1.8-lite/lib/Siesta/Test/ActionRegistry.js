/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Action

*/
Class('Siesta.Test.ActionRegistry', {
    
    my : {
    
        has : {
            actionClasses       : Joose.I.Object
        },
    
        
        methods : {
            
            registerAction : function (name, constructor) {
                this.actionClasses[ name.toLowerCase() ] = constructor
            },

            
            getActionClass : function (name) {
                return this.actionClasses[ name.toLowerCase() ]
            },
            
            
            create : function (obj) {
                if (!obj.action && !obj.waitFor && !obj.verify) throw "Need to include `action`, `verify` or `waitFor` property in the step config"
                
                var actionClass = this.getActionClass((obj.waitFor && "wait") || obj.action || "verify");

                return new actionClass(obj)
            }
        }
    }
});
