/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
 * 
@class Siesta.Test.Browser
@extends Siesta.Test
@mixin Siesta.Test.Simulate.Event
@mixin Siesta.Test.TextSelection 
@mixin Siesta.Test.Simulate.Mouse
@mixin Siesta.Test.Simulate.Keyboard


A base class for testing a generic browser functionality. It has various DOM-related assertions, and is not optimized for any framework.

*/
Class('Siesta.Test.Browser', {
    
    isa         : Siesta.Test,
        
    does        :  [ 
        Siesta.Test.Simulate.Event,
        Siesta.Test.Simulate.Mouse,
        Siesta.Test.Simulate.Keyboard,
        Siesta.Test.Element,
        Siesta.Test.TextSelection
    ],

    has : {
        currentPosition : {
           init : function () { return [0, 0]; }
        }
    },

    methods : { 
        $ : function () {
            var local$ = $.rebindWindowContext(this.global);
            return local$.apply(this.global, arguments);
        },
        
        
        // Normalizes the element to an HTML element. Every 'framework layer' will need to provide its own implementation
        // This implementation accepts either a CSS selector or an Array with xy coordinates.
        normalizeElement : function (el, allowMissing) {
            if (typeof el === 'string') {
                // DOM query
                var origEl = el;
                el = this.$(el)[ 0 ];
                if (!allowMissing && !el) {
                    throw 'No DOM element found found for CSS selector: ' + origEl;
                }
            }
            
            if (this.isArray(el)) {
                var document    = this.global.document
                
                el = document.elementFromPoint(el[0], el[1]) || document.body;
            }
            
            return el;
        },
        
        
        // this method generally has the same semantic as the "normalizeElement", its being used in 
        // Siesta.Test.Action.Role.HasTarget to determine what to pass to next step
        //
        // on the browser level the only possibility is DOM element
        // but on ExtJS level user can also use ComponentQuery and next step need to receive the 
        // component instance
        normalizeActionTarget : function (el) {
            var result = this.normalizeElement(el);
            
            if (!result) {
                throw 'No action target found for: ' + el;
            }
            return result;
        },
        
        
        // private
        getPathBetweenPoints: function (from, to) {
            if (typeof from[0] !== 'number' || typeof from[1] !== 'number' || typeof to[0] !== 'number' || typeof to[1] !== 'number') {
                throw 'Incorrect arguments passed to getPathBetweenPoints';
            }

            var stops = [],
                x0 = Math.floor(from[0]),
                x1 = Math.floor(to[0]),
                y0 = Math.floor(from[1]),
                y1 = Math.floor(to[1]),
                dx = Math.abs(x1 - x0),
                dy = Math.abs(y1 - y0),
                sx, sy, err, e2;

            if (x0 < x1) {
                sx = 1;
            } else {
                sx = -1;
            }

            if (y0 < y1) {
                sy = 1;
            } else {
                sy = -1;
            }
            err = dx - dy;
            
            while (x0 !== x1 || y0 !== y1) {
                e2 = 2 * err;
                if (e2 > -dy) {
                    err = err - dy;
                    x0 = x0 + sx;
                }

                if (e2 < dx) {
                    err = err + dx;
                    y0 = y0 + sy;
                }
                stops.push([x0, y0]);
            }

            stops.push(to);
            return stops;
        },

        randomBetween : function (min, max) {
            return Math.round(min + (Math.random()*(max - min)));
        },

        
        // private
        isArray : function(a) {
            return a && (a instanceof Array || a instanceof this.global.Array);
        },
        
        
        /**
         * This method will return the top-most DOM element at the specified coordinates from the test page.
         * 
         * @param {Number} x The X coordinate
         * @param {Number} y The Y coordinate
         * @return {HTMLElement} The top-most element at the specified position on the test page
         */
        elementFromPoint : function (x, y) {
            return this.global.document.elementFromPoint(x, y)
        },

        getElementAtCursor : function() {
            var xy          = this.currentPosition,
                document    = this.global.document;
            
            return document.elementFromPoint(xy[0], xy[1]) || document.body;
        },

        /**
         * This method will wait for the first browser `event`, fired by the provided `observable` and will then call the provided callback.
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of the event to wait for
         * @param {Function} callback The callback to call 
         * @param {Object} scope The scope for the callback
         * @param {Number} timeout The maximum amount of time to wait for the condition to be fulfilled. Defaults to the {@link Siesta.Test.ExtJS#waitForTimeout} value.
         */
        waitForEvent : function (observable, event, callback, scope, timeout) {
            var eventFired      = false
            
            this.$(observable).bind(event, function () { eventFired = true })
            
            this.waitFor({
                method          : function() { return eventFired; }, 
                callback        : callback,
                scope           : scope,
                timeout         : timeout,
                assertionName   : 'waitForEvent',
                description     : ' observable to fire its "' + event + '" event'
            });
        },

        /**
         * This assertion can be expressed as the following statement: When calling the passed 
         * function `func`, the passed `observable` will fire the `event` `n` times, during the
         * following `timeOut` milliseconds. 
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of event
         * @param {Number} n The expected number of events
         * @param {Number} timeOut The number of milliseconds to wait for events to be fired
         * @param {Function} func The function which should fire the events to detect
         * @param {String} desc The description of the assertion.
         * @param {Function} callback Optional. A callback to call after the assertion was checked. 
         */
         firesOk: function (observable, event, n, timeOut, func, desc, callback) {
            var me              = this;
            var async           = this.beginAsync(timeOut + 100);
            var sourceLine      = me.getSourceLine();
            
            var originalSetTimeout = this.originalSetTimeout;

            originalSetTimeout(function () {

                me.endAsync(async);

                this.$(observable).unbind(event, countFunc)

                if (counter == n)
                    me.pass(desc, 'Exactly ' + n + " '" + event + "' events have been fired");
                else
                    me.fail(desc, {
                        assertionName   : 'firesOk',
                        sourceLine      : sourceLine,
                        annotation      : n + " '" + event + "' events were expected, but " + counter + ' were fired'
                    });

                callback && me.processCallbackFromTest(callback, null, scope || me)

            }, timeOut);


            var counter = 0;

            var countFunc = function () { counter++; };

            this.$(observable).bind(event, countFunc)

            func();
        },
        
        
        /**
         * This assertion passes if the observable fires the specified event exactly (n) times during the test execution.
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of event
         * @param {Number} n The expected number of events to be fired
         * @param {String} desc The description of the assertion.
         */
        willFireNTimes: function (observable, event, n, desc, isGreaterEqual) {
            var me              = this;
            
            var sourceLine      = me.getSourceLine();
            
            this.on('beforetestfinalizeearly', function () {
                this.$(observable).unbind(event, countFunc)
                
                if (counter === n || (isGreaterEqual && counter > n)) {
                    me.pass(desc || 'Exactly ' + n + " '" + event + "' events have been fired");
                } else {
                    me.fail(desc || 'Expected ' + n + " '" + event + "' events to fire", {
                        assertionName   : 'willFireNTimes',
                        annotation      : n + " '" + event + "' events were expected, but " + counter + ' were fired',
                        sourceLine      : sourceLine
                    });
                }
            });

            var counter = 0,
                countFunc = function () { counter++; };

            this.$(observable).bind(event, countFunc)
        },

        /**
         * This assertion passes if the observable does not fire the specified event after calling this method.
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of event
         * @param {String} desc The description of the assertion.
         */
        wontFire : function(observable, event, desc) {
            this.willFireNTimes(observable, event, 0, desc);
        },

        /**
         * This assertion passes if the observable fires the specified event exactly once after calling this method.
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of event
         * @param {String} desc The description of the assertion.
         */
        firesOnce : function(observable, event, desc) {
            this.willFireNTimes(observable, event, 1, desc);
        },

        /**
         * Alias for {@link #wontFire} method
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of event
         * @param {String} desc The description of the assertion.
         */
        isntFired : function() {
            this.wontFire.apply(this, arguments);
        },

        /**
         * This assertion passes if the observable does not fire the specified event through the duration of the entire test.
         * 
         * @param {Mixed} observable Any browser observable, window object, element instances, CSS selector.
         * @param {String} event The name of event
         * @param {Number} n The minimum number of events to be fired
         * @param {String} desc The description of the assertion.
         */
        firesAtLeastNTimes : function(observable, event, n, desc) {
            this.willFireNTimes(observable, event, n, desc, true);
        },


        // This method accepts actionTargets as input (Dom node, string, CQ etc) and does a first normalization pass to get a DOM element.
        // After initial normalization it also tries to locate, the 'top' DOM node at the center of the first pass resulting DOM node.
        // This is the only element we can truly interact with in a real browser.
        // returns an object containing the element plus coordinates
        getNormalizedTopElementInfo : function (actionTarget, skipWarning, actionName) {
            var doc         = this.global.document;
            var xy, el;

            actionTarget = actionTarget || this.currentPosition;

            // First lets get a normal DOM element to work with
            if (this.isArray(actionTarget)) {
                // If the actionTarget is an array, we just resolve the element at that position and that's it
                xy = actionTarget;
                el = doc.elementFromPoint(actionTarget[0], actionTarget[1]);
            } else {
                el = this.normalizeElement(actionTarget);
            }

            // IE returns null for elementFromPoint in some cases
            el = el || doc.body;

            // If this element is not visible, something is wrong
            if (!skipWarning && !this.isElementVisible(el)) {
                this.fail('findTopDomElement: ' + (actionName ? "Target element of action [" + actionName + "]" : "Target element of some action") +
                        " is not visible: " + (el.id ? '#' + el.id : el)
                );

                return; // No point going further
            }

            if (!this.isArray(actionTarget)) {
                doc         = el.ownerDocument;
                xy          = this.findCenter(el);
                el          = doc.elementFromPoint(xy[0], xy[1]);

                if (!el) {
                    this.fail('findTopDomElement: Could not find any element at [' + xy + ']');
                    return; // No point going further
                }
            }

            return {
                el          : el,
                xy          : xy
            }
        }
    }
});
