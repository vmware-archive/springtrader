/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
 * 
@class Siesta.Test.ExtJSCore

A base mixin for testing ExtJS and SenchaTouch applications. 

Contains testing functionality that is common for both frameworks.

This file is a reference only, for a getting start guide and manual, please refer to <a href="#!/guide/siesta_getting_started">Getting Started Guide</a>.

*/
Role('Siesta.Test.ExtJSCore', {
    
    has : {
        waitForExtReady         : true,
        waitForAppReady         : false,
        loaderPath              : null,
        
        simulateEventsWith      : {
            is      : 'rw',
            init    : function () {
                var div = document.createElement('div')
                
                return div.attachEvent ? 'fireEvent' : 'dispatchEvent'
            }
        },
        
        isExtOnReadyDone        : false,
        isAppReadyDone          : false
    },

    override : {
        isReady : function() {
            var result = this.SUPERARG(arguments);

            if (!result.ready) return result;

            if (this.waitForExtReady && !this.isExtOnReadyDone) return {
                ready       : false,
                reason      : "Waiting for Ext.onReady took too long - some dependency can't be loaded? \nCheck the `Net` tab in Firebug"
            }
            
            if (this.waitForAppReady && !this.isAppReadyDone) return {
                ready       : false,
                reason      : "Waiting for MVC application launch took too long - no MVC application on test page? \nYou may need to disable the `waitForAppReady` config option."
            }
            
            return {
                ready       : true
            }
        },

        // Overridden to deal with the different event firing mechanisms in Ext JS 3 vs 4
        // This code is required because in IE are simulated using fireEvent instead of dispatchEvent and it seems fireEvent will
        // will not update a checkbox 'checked' state properly so we're forcing the toggle to solve this situation. 
        // This issue is only relevant in IE + Ext. 
        //
        // Test case: 507_form_checkbox.t.js
        simulateMouseClick: function (el, callback, scope) {
            
            // Force check toggle for input checkboxes
            if (this.simulateEventsWith === 'fireEvent' && (el.type === 'checkbox' || el.type === 'radio') && !el.disabled && !el.readOnly) {
                var oldState = el.checked;

                if (callback) {
                    this.SUPER(el, function() { 
                        if (el.checked === oldState) {
                            el.checked = !oldState;
                        }
                        callback.call(scope || this);
                    });
                } else {
                    this.SUPER(el);

                    if (el.checked === oldState) {
                        el.checked = !oldState;
                    }
                }
            } else {
                this.SUPERARG(arguments);
            }
        }
    },

    methods : {
        
        initialize : function() {
            // Since this test is preloading Ext JS, we should let Siesta know what to 'expect'
            this.expectGlobals('Ext', 'id');
            this.SUPER();
        },
        
        
        start : function (alreadyFailedWithException) {
            var me      = this;
            var Ext     = this.getExt();
            
            if (!Ext) {
                // proceed to parent implementation disabling our "can start" checkers 
                this.waitForAppReady    = false
                this.waitForExtReady    = false
                
                this.SUPERARG(arguments)
                
                return
            }
            
            if (this.loaderPath) {
                Ext.Loader.setPath(this.loaderPath);
            }

            Ext.onReady(function () {
                me.isExtOnReadyDone     = true
            })
            
            // this flag will explain to Ext, that DOM ready event has already happened
            // Ext fails to set this flag if it was loaded dynamically, already after DOM ready
            // the test will start only after DOM ready anyway, so we just set this flag  
            Ext.isReady         = true

            var canWaitForApp   = Ext.ClassManager && Boolean(Ext.ClassManager.get('Ext.app.Application'))
            
            if (!canWaitForApp) this.waitForAppReady = false
                
            if (this.waitForAppReady && canWaitForApp)
                Ext.util.Observable.observe(Ext.app.Application, {
                    launch      : function () {
                        me.isAppReadyDone   = true
                    },
                    
                    single      : true,
                    delay       : 100
                })
            
            this.SUPERARG(arguments)
        },

        /**
         * This method returns the `Ext` object from the scope of the test. When creating your own assertions for Ext JS code, you need
         * to make sure you are using this method to get the `Ext` instance. Otherwise, you'll be using the same "top-level" `Ext`
         * instance, used by the harness for its UI. 
         * 
         * For example:
         * 
         *      elementHasProvidedCssClass : function (el, cls, desc) {
         *          var Ext     = this.getExt();
         *          
         *          if (Ext.fly(el).hasCls(cls)) {
         *              this.pass(desc);
         *          } else {
         *              this.fail(desc);
         *          }
         *      }
         *   
         * @return {Object} The `Ext` object from the scope of test
         */
        getExt : function () {
            return this.global.Ext
        },
        
        
        /**
         * The alias for {@link #getExt}
         * @method
         */
        Ext : function () {
            return this.global.Ext
        },
        
        // Accepts Ext.Component or ComponentQuery
        normalizeComponent : function(component, allowEmpty) {
            var Ext = this.Ext();

            if (typeof component === 'string') {
                var result = Ext.ComponentQuery.query(component);
                
                if (!allowEmpty && result.length < 1)   this.warn('Your component query: ' + component + ' returned no components.');
                if (result.length > 1)   this.warn('Your component query: ' + component + ' returned more than 1 component.');
                
                component = result[ 0 ];
            }            

            return component;
        },

        /**
         * @private
         * @param {Ext.Component} comp the Ext.Component
         * @param {Boolean} locateInputEl For form fields, try to find the inner input element by default.
         *                  If you want to target the containing Component element, pass false instead.
         * @return {*}
         */
        compToEl : function (comp, locateInputEl) {
            var Ext = this.Ext();

            if (!comp) return null

            locateInputEl = locateInputEl !== false;

            // Ext JS
            if (Ext && Ext.form && Ext.form.Field && locateInputEl) {
                if (comp instanceof Ext.form.Field && comp.inputEl){
                    return comp.inputEl;
                }
            }

            // Sencha Touch: Form fields can have a child input component
            if (Ext && Ext.field && Ext.field.Field && comp instanceof Ext.field.Field && locateInputEl) {
                comp = comp.getComponent();
            }

            //                                          Ext JS         vs Sencha Touch
            return Ext.getVersion('extjs') ? comp.getEl() || comp.el : comp.element;
        },

        // Accept Ext.Element and Ext.Component
        normalizeElement : function(el, allowMissing) {
            if (!el) return null
            
            var Ext = this.getExt();

            var origEl = el;

            if (typeof el === 'string') {
                if (el.match(/=>/))
                    // Composite query
                    el      = this.compositeQuery(el)[ 0 ]
                else if (el.match(/^>>/)) {
                    // Component query
                    el = this.cq1(el.substring(2))
                } else {
                    // string in  unknown format, guessing its a DOM query
                    return this.SUPER(el, allowMissing)
                }

                if (!allowMissing && !el) {
                    throw 'No component found found for CQ: ' + origEl;
                }
            }

            if (Ext && Ext.Component && el instanceof Ext.Component) {
                el = this.compToEl(el);
                var center = this.findCenter(el);

                el = this.elementFromPoint(center[0], center[1]) || el;
            }

            // ExtJS Element
            if (el && el.dom) return el.dom
                
            // will also handle the case of conversion of array with coordinates to el 
            return this.SUPER(el, allowMissing);
        },
        
        
        // this method generally has the same semantic as the "normalizeElement", its being used in 
        // Siesta.Test.Action.Role.HasTarget to determine what to pass to next step
        //
        // on the browser level the only possibility is DOM element
        // but on ExtJS level user can also use ComponentQuery and next step need to receive the 
        // component instance
        normalizeActionTarget : function (el) {
            if (typeof el === 'string') {
                if (el.match(/^>>/)) {
                    // Component query
                    var result = this.cq1(el.substring(2));

                    if (!result || result.length < 1) {
                        throw 'No component found found for CQ: ' + el;
                    }
                    return result;
                }
            }
            
            var Ext = this.getExt();
            
            // if user has passed ExtJS Component, return it as is
            if (Ext && el instanceof Ext.Component) return el
            
            // if user has passed ExtJS Element, return it as is
            if (el && el.dom) return el

            return this.SUPER(el)
        },

         /**
         * This method allow assertions to fail silently for tests executed in versions of Ext JS up to a certain release. When you try to run this test on a newer
         * version of Ext JS and it fails, it will fail properly and force you to re-investigate. If it passes in the newer version, you should remove the 
         * use of this method.
         * 
         * See also {@link Siesta.Test#todo}
         *   
         * @param {String} frameworkVersion The Ext JS framework version, e.g. '4.0.7'
         * @param {Function} fn The method covering the broken functionality
         * @param {String} reason The reason or explanation of the bug
        */
        knownBugIn : function(frameworkVersion, fn, reason) {
            var Ext = this.getExt();
            this.diag('Known bug in ' + frameworkVersion + ': ' + (reason || ''));

            if (Ext.versions.core.isGreaterThan(frameworkVersion)) {
                fn.call(this.global, this);
            } else {
                this.todo(reason, fn);
            }
        },
        
        
         /**
         * This method will load the specified classes with `Ext.require()` and call the provided callback. Additionally it will check that all classes have been loaded.
         * 
         * This method accepts either variable number of arguments:
         *
         *      t.requireOk('Some.Class1', 'Some.Class2', function () { ... })
         * or array of class names:
         * 
         *      t.requireOk([ 'Some.Class1', 'Some.Class2' ], function () { ... })
         * 
         * @param {String} className1 The name of the class to `require`
         * @param {String} className2 The name of the class to `require`
         * @param {String} classNameN The name of the class to `require`
         * @param {Function} fn The callback. Will be called even if the loading of some classes have failed.
        */
        requireOk : function () {
            var me                  = this
            var global              = this.global
            var Ext                 = this.getExt()
            var args                = Array.prototype.concat.apply([], arguments)
            
            var callback
            
            if (this.typeOf(args[ args.length - 1 ]) == 'Function') callback = args.pop()
            
            
            // what to do when loading completed or timed-out
            var continuation    = function () {
                me.endAsync(async)
                
                Joose.A.each(args, function (className) {
                    var cls     = Ext.ClassManager.get(className)
                    
                    //                       normal class                         singleton
                    if (cls && (me.typeOf(cls) == 'Function' || me.typeOf(cls.self) == 'Function'))
                        me.pass("Class: " + className + " was loaded")
                    else
                        me.fail("Class: " + className + " was loaded")
                })
                
                callback && me.processCallbackFromTest(callback)
            }
            
            var timeout         = Ext.isIE ? 120000 : 30000,
                async           = this.beginAsync(timeout + 100)
            
            var hasTimedOut     = false
            
            var timeoutId       = global.setTimeout(function () {
                hasTimedOut     = true
                continuation()
            }, timeout)
            
            Ext.Loader.setConfig({ enabled : true });

            Ext.require(args, function () {
                global.clearTimeout(timeoutId)
                
                if (!hasTimedOut) continuation() 
            })
        },
        
        /**
         * This method is a simple wrapper around the {@link #chainClick} - it performs a component query for provided `selector` starting from the `root` container
         * and then clicks on all found components, in order:
         * 

    // click all buttons in the `panel`
    t.clickComponentQuery('button', panel, function () {})
    
         * 
         * The 2nd argument for this method can be omitted and method can be called with 2 arguments only. In this case a global component query will be performed:
         *

    // click all buttons in the application
    t.clickComponentQuery('button', function () {})
    
         * 
         * @param {String} selector The selector to perform a component query with
         * @param {Ext.Container} root The optional root container to start a query from.
         * @param {Function} callback The callback to call, after clicking all the found components
         */
        clickComponentQuery : function (selector, root, callback) {
            
            if (arguments.length == 2 && this.typeOf(arguments[ 1 ]) == 'Function') {
                callback    = root
                root        = this.Ext().ComponentQuery
            }
            
            if (arguments.length == 1) {
                root        = this.Ext().ComponentQuery
            }
            
            var result      = root.query(selector)
            
            this.chainClick(result, function () { callback && callback.call(this, result) })
        },
        
        
        /**
         * An alias for {@link #clickComponentQuery}.
         * 
         * @param {String} selector The selector to perform a component query with
         * @param {Ext.Container} root The optional root container to start a query from.
         * @param {Function} callback The callback to call, after clicking all the found components
         */
        clickCQ : function () {
            this.clickComponentQuery.apply(this, arguments)
        },

        /**
         * This method performs a combination of `Ext.ComponentQuery` and DOM query, allowing to easily find the DOM elements, 
         * matching a css selector, inside of some Ext.Component.
         * 
         * Both queries should be combined with the `=>` separator: 
         *      
         *      gridpanel[title=Accounts] => .x-grid-row
         *       
         * On the left side of such "composite" query should be a component query, on the right - DOM query (CSS selector)
         * 
         * This method will generate exception, if component query returns no results. In case when component query returns more than one
         * component, method will generate a warning and proceed with the 1st found component. The exception/warning can be suppressed with the "allowEmpty" argument.
         * 
         * E.g. the composite query `gridpanel[title=Accounts] => .x-grid-row` will give you the grid row elements inside a certain grid panel
         * 
         * @param {String} selector The CompositeQuery selector
         * @param {Ext.Component} root The optional root component to start the component query from. If omitted, global component query will be performed.
         * @param {Boolean} allowEmpty True to suppress the exception/warnings from this method if no match is found. Default is `false`.
         * 
         * @return {HTMLElement[]} The array of DOM elements 
         */
        compositeQuery : function (selector, root, allowEmpty) {
            var Ext     = this.Ext();
            root        = root || Ext.ComponentQuery;

            // Ext JS specific
            // Try to find magic => selector for nested ComponentQuery and CSS selector
            var result  = selector.split('=>');

            if (result.length < 1) throw "Invalid composite query selector: " + selector
            
            var cmp     = root.query(result[0]);
                    
            if (!cmp.length)
                if (allowEmpty) 
                    return []
                else
                    throw 'ComponentQuery ' + result[0] + ' matched no Ext.Component';
            
            if (cmp.length > 1) this.warn('ComponentQuery ' + result[0] + ' matched more than 1 Ext.Component')
                    
            cmp         = cmp[0];

            if (!cmp.rendered) throw 'The source component of the composite query: ' + cmp.id + ' is not yet rendered';


            return this.compToEl(cmp, false).query(result[1]);
        },
        
        /**
         * An alias for Ext.ComponentQuery.query
         * 
         * @param {String} selector The selector to perform a component query with
         */
        cq : function (selector) {
            return this.Ext().ComponentQuery.query(selector);
        },

        /**
         * An shorthand method to get the first result of any Ext.ComponentQuery.query
         * 
         * @param {String} selector The selector to perform a component query with
         */
        cq1 : function (selector) {
            return this.Ext().ComponentQuery.query(selector)[0];
        }
    }
})
