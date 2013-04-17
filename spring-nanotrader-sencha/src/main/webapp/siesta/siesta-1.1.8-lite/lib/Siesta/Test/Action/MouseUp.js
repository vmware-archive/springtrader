/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.MouseUp
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action can be included in a `t.chain` call with "mouseUp" shortcut:

    t.chain(
        {
            action      : 'mouseUp',
            target      : someDOMElement,
            options     : { shiftKey : true } // Optionally hold shiftkey
        }
    )

This action will perform a {@link Siesta.Test.Browser#mouseUp mouseUp} on the provided {@link #target}. 

*/
Class('Siesta.Test.Action.MouseUp', {
    
    isa         : Siesta.Test.Action,
    
    does        : Siesta.Test.Action.Role.HasTarget,
        
    has : {
        requiredTestMethod  : 'mouseUp',

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
            // This method is synchronous
            this.test.mouseUp(this.getTarget(), this.options);

            setTimeout(this.next, 100);
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('mouseUp', Siesta.Test.Action.MouseUp)
Siesta.Test.ActionRegistry.registerAction('fingerUp', Siesta.Test.Action.MouseUp)
