/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.DoubleClick
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action will perform a {@link Siesta.Test.Browser#doubleClick double click} on the provided {@link #target}. 

This action can be included in the `t.chain` call with "doubleclick" or "doubleClick" shortcuts:

    t.chain(
        {
            action      : 'doubleclick',
            target      : someDOMElement,
            options     : { shiftKey : true } // Optionally hold shiftkey
        }
    )


*/
Class('Siesta.Test.Action.DoubleClick', {
    
    isa         : Siesta.Test.Action,
    
    does        : Siesta.Test.Action.Role.HasTarget,
        
    has : {
        requiredTestMethod  : 'doubleClick',

        /**
         * @cfg {Object} options
         *
         * Any options that will be used when simulating the event. For information about possible
         * config options, please see: https://developer.mozilla.org/en-US/docs/DOM/event.initMouseEvent
         */
        options : null
    },

    
    methods : {
        
        process : function () {
            this.test.doubleClick(this.getTarget(), this.next, null, this.options)
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('doubleclick', Siesta.Test.Action.DoubleClick)
