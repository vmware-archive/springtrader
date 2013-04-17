/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.RightClick
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action will perform a {@link Siesta.Test.Browser#rightClick right click} on the provided {@link #target}. 

This action can be included in the `t.chain` call with "rightclick" or "rightClick" shortcuts:

    t.chain(
        {
            action      : 'rightclick',
            target      : someDOMElement,
            options     : { shiftKey : true } // Optionally hold shiftkey
        }
    )


*/
Class('Siesta.Test.Action.RightClick', {
    
    isa         : Siesta.Test.Action,
    
    does        : Siesta.Test.Action.Role.HasTarget,
        
    has : {
        requiredTestMethod  : 'rightClick',

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
            this.test.rightClick(this.getTarget(), this.next)
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('rightclick', Siesta.Test.Action.RightClick)
