/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.ExtJS.Observable

This is a mixin, with helper methods for testing functionality relating to Ext.util.Observable class. This mixin is being consumed by {@link Siesta.Test.ExtJS}

*/
Role('Siesta.Test.ExtJS.Observable', {
    
    methods : {
        
        /**
         * This assertion can be expressed as the following statement: When calling the passed 
         * function `func`, the passed `observable` will fire the `event` `n` times, during the
         * following `timeOut` milliseconds. 
         * 
         * @param {Ext.util.Observable/Ext.Element} observable The observable instance  
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

                observable.un(event, countFunc);

                if (counter == n)
                    me.pass(desc, 'Exactly ' + n + " '" + event + "' events have been fired");
                else
                    me.fail(desc, {
                        assertionName   : 'firesOk',
                        sourceLine      : sourceLine,
                        annotation      : n + " '" + event + "' events were expected, but " + counter + ' were fired'
                    });

                callback && me.processCallbackFromTest(callback);

            }, timeOut);


            var counter = 0;

            var countFunc = function () { counter++; };

            observable.on(event, countFunc);

            func();
        },
        
        
        /**
         * This assertion passes if the observable fires the specified event exactly (n) times during the test execution.
         * 
         * @param {Ext.util.Observable/Ext.Element} observable The observable instance  
         * @param {String} event The name of event
         * @param {Number} n The expected number of events to be fired
         * @param {String} desc The description of the assertion.
         */
        willFireNTimes: function (observable, event, n, desc, isGreaterEqual) {
            var me              = this;
            var Ext = this.Ext();
            
            var sourceLine      = me.getSourceLine();

            if (observable.on && observable.un) {
            
                this.on('beforetestfinalizeearly', function () {
                    observable.un(event, countFunc);
                
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

                observable.on(event, countFunc);
            } else {
                this.SUPERARG(arguments);
            }
        },

        /**
         * This assertion passes if the observable does not fire the specified event after calling this method.
         * 
         * @param {Ext.util.Observable/Ext.Element} observable The observable instance  
         * @param {String} event The name of event
         * @param {String} desc The description of the assertion.
         */
        wontFire : function(observable, event, desc) {
            this.willFireNTimes(observable, event, 0, desc);
        },

        /**
         * This assertion passes if the observable fires the specified event exactly once after calling this method.
         * 
         * @param {Ext.util.Observable/Ext.Element} observable The observable instance  
         * @param {String} event The name of event
         * @param {String} desc The description of the assertion.
         */
        firesOnce : function (observable, event, desc) {
            this.willFireNTimes(observable, event, 1, desc);
        },

        /**
         * Alias for {@link #wontFire} method
         * 
         * @param {Ext.util.Observable/Ext.Element} observable The observable instance  
         * @param {String} event The name of event
         * @param {String} desc The description of the assertion.
         */
        isntFired : function() {
            this.wontFire.apply(this, arguments);
        },

        /**
         * This assertion passes if the observable does not fire the specified event through the duration of the entire test.
         * 
         * @param {Ext.util.Observable/Ext.Element} observable The observable instance  
         * @param {String} event The name of event
         * @param {Number} n The minimum number of events to be fired
         * @param {String} desc The description of the assertion.
         */
        firesAtLeastNTimes : function(observable, event, n, desc) {
            this.willFireNTimes(observable, event, n, desc, true);
        },
        
        
        /**
         * This method will wait for the first `event`, fired by the provided Ext JS `observable` and will then call the provided callback.
         * 
         * @param {Ext.util.Observable/String/Ext.Element} observable The observable to wait on, or a ComponentQuery matching a component
         * @param {String} event The name of the event to wait for
         * @param {Function} callback The callback to call 
         * @param {Object} scope The scope for the callback
         * @param {Number} timeout The maximum amount of time to wait for the condition to be fulfilled. Defaults to the {@link Siesta.Test.ExtJS#waitForTimeout} value.
         */
        waitForEvent : function (observable, event, callback, scope, timeout) {
            var Ext = this.Ext();
            observable = this.normalizeComponent(observable);
            
            if (observable instanceof Ext.Element || observable.fireEvent && observable.fireEvent === Ext.util.Observable.prototype.fireEvent) {
                var eventFired      = false
            
                observable.on(event, function () { eventFired = true }, null, { single : true })
            
                this.waitFor({
                    method          : function() { return eventFired; }, 
                    callback        : callback,
                    scope           : scope,
                    timeout         : timeout,
                    assertionName   : 'waitForEvent',
                    description     : ' observable to fire its "' + event + '" event'
                });
            } else {
                this.SUPERARG(arguments);
            }
        },
        
        
        /**
         * This method passes if the provided `observable` has a listener for the `eventName`
         * 
         * @param {Ext.util.Observable} The observable
         * @param {String} eventName The name of the event
         * @param {String} description The description of the assertion.
         */
        hasListener : function (observable, eventName, description) {
            if (!observable || !observable.hasListener) {
                this.fail(description, {
                    assertionName       : 'hasListener',
                    annotation          : '1st argument for `t.hasListener` should be an observable instance'
                })
                
                return
            }
            
            if (observable.hasListener(eventName))
                this.pass(description)
            else
                this.fail(description, {
                    assertionName       : 'hasListener',
                    annotation          : 'Provided observable has no listeners for event: ' + eventName
                })
        },


        /**
         * This assertion will verify that the observable fires the specified event and supplies the correct parameters to the listener function.
         * A checker method should be supplied that verifies the arguments passed to the listener function, and then returns true or false depending on the result.
         * If the event was never fired, this assertion fails. If the event is fired multiple times, only one pass/fail message will be reported.
         * 
         * @param {Ext.util.Observable} observable The observable instance  
         * @param {String} event The name of event
         * @param {Function} checkerFn A method that should verify each argument, and return true or false depending on the result.
         * @param {String} desc The description of the assertion.
         */
        isFiredWithSignature : function(observable, event, checkerFn, description) {
            var eventFired;
            var me = this;
            var sourceLine = me.getSourceLine();

            // TODO
            if (this.typeOf(checkerFn) !== 'Function') {
                var args = checkerFn;

//                checkerFn = function() {
//                    Joose.A.each(arguments, function(a) {
//                        if (a instance
//                    });
//                    return    
//                }
            }
            var verifyFiredFn = function () {
                observable.un(event, listener);

                if (!eventFired) {
                    me.fail(event + " event was not fired during the test");
                }
            };
            me.on('beforetestfinalizeearly', verifyFiredFn);

            var listener = function () { 
                me.un('beforetestfinalizeearly', verifyFiredFn);
                
                var result = checkerFn.apply(me, arguments);

                if (!eventFired && result) {
                    me.pass(description || 'Observable fired ' + event + ' with correct signature');
                }

                if (!result) {
                    me.fail(description || 'Observable fired ' + event + ' with incorrect signature', {
                        sourceLine : sourceLine
                    });
                    
                    // Don't spam the assertion grid with failure, one failure is enough
                    observable.un(event, listener);
                }
                eventFired = true 
            };

            observable.on(event, listener);
        }
    }
});
