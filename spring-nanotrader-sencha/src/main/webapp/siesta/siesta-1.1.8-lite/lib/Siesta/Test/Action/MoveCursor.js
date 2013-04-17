/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**

@class Siesta.Test.Action.MoveCursor
@extends Siesta.Test.Action
@mixin Siesta.Test.Action.Role.HasTarget

This action can be included in the `t.chain` call with "moveCursorTo" shortcut:

    t.chain(
        {
            action      : 'moveCursor',
            to          : 'div.someClass'   // A div with class='someClass'
        },
        {
            action      : 'moveCursor',
            to          : [400, 300]        // Target pixel coordinates
        },
        {
            action      : 'moveCursor',
            by          : [20, 10]  // 20 px right, 10 px down
        }
    )

This action will perform a {@link Siesta.Test.Simulate.Mouse#moveCursorTo moveCursorTo} to the provided 'to' destination or the relative 'by' offset.

*/
Class('Siesta.Test.Action.MoveCursor', {
    
    isa         : Siesta.Test.Action,
    
    has : {
        requiredTestMethod  : 'moveMouseTo',
        to                  : null,
        by                  : null
    },

    
    methods : {
        getTo : function () {
            if (this.test.typeOf(this.to) == 'Function')
                return this.to.call(this.test, this)
            else
                return this.to
        },
        
        
        getBy : function () {
            if (this.test.typeOf(this.by) == 'Function')
                return this.by.call(this.test, this)
            else
                return this.by
        },

        process : function () {
            var test = this.test;
            var next = this.next;

            if (this.to) {
                var normalizedTarget    = test.normalizeActionTarget(this.getTo())
                test.moveMouseTo(this.getTo(), function() { next(normalizedTarget); })
            } else {
                var currentXY = test.currentPosition;
                var normalizedTarget = test.normalizeActionTarget([currentXY[0] + this.getBy()[0], currentXY[1] + this.getBy()[1]]);
                test.moveMouseBy(this.getBy(), function() { next(normalizedTarget); })
            }
        }
    }
});


Siesta.Test.ActionRegistry.registerAction('moveCursor', Siesta.Test.Action.MoveCursor)
Siesta.Test.ActionRegistry.registerAction('moveMouse', Siesta.Test.Action.MoveCursor)
Siesta.Test.ActionRegistry.registerAction('moveFinger', Siesta.Test.Action.MoveCursor)
