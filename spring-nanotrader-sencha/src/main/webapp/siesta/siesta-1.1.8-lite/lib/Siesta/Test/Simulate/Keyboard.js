/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Simulate.Keyboard

This is a mixin, providing the keyboard events simulation functionality.


*/

//        Copyright (c) 2011 John Resig, http://jquery.com/

//        Permission is hereby granted, free of charge, to any person obtaining
//        a copy of this software and associated documentation files (the
//        "Software"), to deal in the Software without restriction, including
//        without limitation the rights to use, copy, modify, merge, publish,
//        distribute, sublicense, and/or sell copies of the Software, and to
//        permit persons to whom the Software is furnished to do so, subject to
//        the following conditions:

//        The above copyright notice and this permission notice shall be
//        included in all copies or substantial portions of the Software.

//        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//        LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//        OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//        WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Role('Siesta.Test.Simulate.Keyboard', {

    requires        : [ 'simulateEvent', 'getSimulateEventsWith', 'getElementAtCursor' ],

    methods: {
        // private
        createKeyboardEvent: function (type, options, el) {
            var evt;

            var e = $.extend({ bubbles: true, cancelable: true, view: this.global,
                ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
                keyCode: 0, charCode: 0
            }, options);

            var doc = el.ownerDocument

            // use W3C standard when available and allowed by "simulateEventsWith" option
            if (doc.createEvent && this.getSimulateEventsWith() == 'dispatchEvent') {
                try {
                    evt = doc.createEvent("KeyEvents");
                    evt.initKeyEvent(type, e.bubbles, e.cancelable, e.view, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.keyCode, e.charCode);
                } catch (err) {
                    evt = doc.createEvent("Events");
                    evt.initEvent(type, e.bubbles, e.cancelable);
                    $.extend(evt, { view: e.view,
                        ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, metaKey: e.metaKey,
                        keyCode: e.keyCode, charCode: e.charCode
                    });
                }
            } else if (doc.createEventObject) {
                evt = doc.createEventObject();
                $.extend(evt, e);
            }
            if ($.browser.msie || $.browser.opera) {
                evt.keyCode = (e.charCode > 0) ? e.charCode : e.keyCode;
                evt.charCode = undefined;
            }
            return evt;
        },

        // private
        createTextEvent: function (type, options, el) {
            var doc         = el.ownerDocument;
            var event       = null;

            // only for Webkit for now
            if (doc.createEvent && !$.browser.msie) {
                try {
                    event = doc.createEvent('TextEvent');

                    if (event && event.initTextEvent) {
                        event.initTextEvent('textInput', true, true, this.global, options.text, 0);
                        return event;
                    }
                }
                catch(e) {}
            }

            return null;
        },


        /**
        * This method will simulate text typing, on a specified DOM element. Simulation of certain advanced keys is supported.
        * You can include the name of such key in the square brackets into the 2nd argument. See {@link Siesta.Test.Simulate.KeyCodes} for a list
        * of key names.
        *
        * For example:
        *

    t.type(el, 'Foo bar[ENTER]', function () {
        ...
    })
        *
        * The following events will be fired, in order: `keydown`, `keypress`, `keyup`
        *
        * @param {Siesta.Test.ActionTarget} el The element to type into
        * @param {String} text The text to type, including any names of special keys in square brackets.
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the type operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        */
        type: function (el, text, callback, scope) {
            el      = this.normalizeElement(el || this.global.document.activeElement);

            // Some browsers (IE/FF) do not overwrite selected text, do it manually.
            var selText = this.getSelectedText(el);

            if (selText) {
                el.value = el.value.replace(selText, '');
            }

            var me          = this

            if (el.readOnly || el.disabled) {
                me.processCallbackFromTest(callback, null, scope || me)

                return;
            }

            // Extract normal chars, or special keys in brackets such as [TAB], [RIGHT] or [ENTER]			
            var keys        = (text + '').match(/\[([^\])]+\])|([^\[])/g) || [];

            var queue       = new Siesta.Util.Queue({

                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,

                interval        : this.actionDelay,
                callbackDelay   : this.afterActionDelay,

                observeTest     : this,

                processor       : function (data, index) {

                    var focusedEl = el.ownerDocument.activeElement;

                    if (focusedEl === el.ownerDocument.body) {
                        // If user clicks around in the harness during ongoing test, the activeElement will be reset to BODY
                        // If this happens, reuse the original el and hope all is well
                        focusedEl = el;
                    }
                    me.keyPress(focusedEl, data.key)
                }
            })

            // Manually focus event to be typed into first
            queue.addStep({
                processor       : function () {
                    try {
                        el.tabIndex = -1;
                        el.focus();
                    } catch (e) {
                    }
                }
            })

            jQuery.each(keys, function (index, key) {
                queue.addStep({
                    key     : key.length == 1 ? key : key.substring(1, key.length - 1)
                })
            });

            var async       = this.beginAsync();

            queue.run(function () {
                me.endAsync(async)

                me.processCallbackFromTest(callback, null, scope || me)
            })
        },

        /**
        * @param {Siesta.Test.ActionTarget} el
        * @param {String} key
        * @param {Object} options any extra options used to configure the DOM event
        *
        * This method will simluate the key press, translated to the specified DOM element.
        * The following events will be fired, in order: `keydown`, `keypress`, `textInput`(webkit only currently), `keyup`
        */
        keyPress: function (el, key, options) {
            el = this.normalizeElement(el);

            var KeyCodes = Siesta.Test.Simulate.KeyCodes().keys,
                keyCode,
                charCode;

            options = options || {};

            options.readableKey = key;
            keyCode = KeyCodes[key.toUpperCase()] || 0;

            if(this.isReadableKey(keyCode)) {
                charCode = key.charCodeAt(0);
            } else {
                charCode = 0;
            }

            var me              = this,
                originalLength  = -1,
                isReadableKey   = me.isReadableKey(keyCode),
                isTextInput     = me.isTextInput(el);

            if (isTextInput) {
                originalLength = el.value.length;
            }

            me.simulateEvent(el, 'keydown', $.extend({ charCode : 0, keyCode : keyCode }, options), true);

            var event           = me.simulateEvent(el, 'keypress', $.extend({ charCode : charCode, keyCode : this.isReadableKey(keyCode) ? 0 : keyCode }, options), false);
            var prevented       = typeof event.defaultPrevented === 'boolean' ? event.defaultPrevented : event.returnValue === false;

            var supports        = Siesta.Harness.Browser.FeatureSupport().supports
            
            if (isTextInput && !prevented) {
                if (isReadableKey) {
                    // PhantomJS does not simulate the "textInput" event correctly if target element is inside an iframe 
                    // (at least not as of 1.6), only the last character is shown.
                    if (!this.harness.isPhantomJS) {
                        // TODO should check first if textInput event is supported
                        me.simulateEvent(el, 'textInput', { text: options.readableKey }, true);
                    }

                    // If the entered char had no impact on the textfield - manually put it there
                    if (!supports.canSimulateKeyCharacters || (originalLength === el.value.length)) {
                        el.value = el.value + options.readableKey;
                    }
                }

                // Manually delete one char off the end if backspace simulation is not supported by the browser
                if (keyCode === KeyCodes.BACKSPACE && !supports.canSimulateBackspace && el.value.length > 0) {
                    el.value = el.value.substring(0, el.value.length - 1);
                }
            }

            if (keyCode === KeyCodes.ENTER && !supports.enterOnAnchorTriggersClick) {
                me.simulateEvent(el, 'click');
            }
            me.simulateEvent(el, 'keyup', $.extend({ charCode : 0, keyCode : keyCode }, options), true);
        },

        isTextInput : function(node) {
            var name = node.nodeName.toLowerCase(),
                type = node.type && node.type.toLowerCase();

            return name === 'textarea' ||
                   (name === 'input' && (type === 'password'    ||
                                         type === 'number'      ||
                                         type === 'search'      ||
                                         type === 'text'        ||
                                         type === 'email'));
        },

        // private
        isReadableKey: function (keyCode) {
            var KC = Siesta.Test.Simulate.KeyCodes();

            return !KC.isNav(keyCode) && !KC.isSpecial(keyCode);
        }
    }
});


