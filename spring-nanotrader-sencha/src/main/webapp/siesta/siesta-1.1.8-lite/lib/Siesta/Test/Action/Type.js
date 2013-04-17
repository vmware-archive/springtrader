/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.Type
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action will {@link Siesta.Test.Browser#type type} provided {@link #text} in the provided {@link #target}. 
Target can be a DOM element or, in case you are using the Siesta.Test.ExtJS class - an instance of Ext.Component (field component for example). 

This action can be included in the `t.chain` call with "type" shortcut:

    t.chain(
        {
            action      : 'type',
            target      : someDOMElement,
            text        : 'Some text'
        }
    )


*/
Class('Siesta.Test.Action.Type', {
    
    isa         : Siesta.Test.Action,
    
    does        : Siesta.Test.Action.Role.HasTarget,
        
    has : {
        requiredTestMethod  : 'type',
        
        /**
         * @cfg {String} text
         * 
         * The text to type into the target
         */
        text                : ''
    },

    
    methods : {
        
        process : function () {
            // By default use the current focused element as target
            this.target = this.target || this.test.global.document.activeElement;

            // additional "getTarget" to allow functions as "target" value
            this.test.type(this.getTarget(), this.text, this.next)
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('type', Siesta.Test.Action.Type)