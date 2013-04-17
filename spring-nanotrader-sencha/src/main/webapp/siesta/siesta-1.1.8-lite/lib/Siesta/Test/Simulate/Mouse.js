/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Test.Simulate.Mouse

This is a mixin, providing the mouse events simulation functionality.
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


Role('Siesta.Test.Simulate.Mouse', {
    
    requires        : [ 'simulateEvent', 'getSimulateEventsWith', 'normalizeElement' ],    
    
    has: {
        /**
         *  @cfg {Int} dragDelay The delay between individual drag events (mousemove)
         */
        dragDelay               : 25,

        /**
         *  @cfg {Boolean} moveCursorBetweenPoints True to move the mouse cursor between for example two clicks on separate elements (for better visual experience)
         */
        moveCursorBetweenPoints : true,

        /**
         *  @cfg {Int} dragPrecision Defines how precisely to follow the path between two points when simulating a drag. 2 indicates every other point will be used.
                                     (low value = slow dragging, high value = fast dragging)
        */
        dragPrecision           : $.browser.msie ? 10 : 5,
        
        overEls : {
           init : function () { return []; }
        }
    },


    methods: {
        // private
        createMouseEvent: function (type, options, el) {
            var event;
            
            options = $.extend({
                bubbles     : type !== 'mouseenter' && type !== 'mouseleave', 
                cancelable  : type != "mousemove", 
                view        : this.global, 
                detail      : 0,

                screenX     : 0,
                screenY     : 0,

                ctrlKey     : false,
                altKey      : false,
                shiftKey    : false,
                metaKey     : false,

                button          : 0,
                relatedTarget   : undefined

            }, options);

            if (!("clientX" in options) || !("clientY" in options)) {
                var center = this.findCenter(el);

                options = $.extend({
                    clientX: center[0],
                    clientY: center[1]
                }, options);
            }

            var doc = el.ownerDocument

            // use W3C standard when available and allowed by "simulateEventsWith" option
            if (doc.createEvent && this.getSimulateEventsWith() == 'dispatchEvent') {
                event = doc.createEvent("MouseEvents");

                event.initMouseEvent(
                    type, options.bubbles, options.cancelable, options.view, options.detail,
                    options.screenX, options.screenY, options.clientX, options.clientY,
                    options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
                    options.button, options.relatedTarget || doc.body.parentNode
                );
                
                
            } else if (doc.createEventObject) {
                event = doc.createEventObject();

                $.extend(event, options);

                event.button = { 0: 1, 1: 4, 2: 2 }[event.button] || event.button;
            }

            // Mouse over is used in some certain edge cases which interfer with this tracking
            if (type !== 'mouseover' && type !== 'mouseout') {
                this.currentPosition = [options.clientX, options.clientY];
            }
            return event;
        },
        
        /**
        * This method will simulate a mouse move to an xy-coordinate or an element (the center of it)
        * 
        * @param {Siesta.Test.ActionTarget} target Target point to move the mouse to.
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        */
        moveMouseTo : function(target, callback, scope) {
            if (!target) {
                throw 'Trying to call moveMouseTo without a target';
            }

            var context = this.getNormalizedTopElementInfo(target);

            if (!context) {
                this.processCallbackFromTest(callback, null, scope || this);
                return;
            }

            // TODO this method should also accept an options object, so user can for example hold CTRL key during mouse operation
//            options.clientX = options.clientX != null ? options.clientX : data.xy[0];
//            options.clientY = options.clientY != null ? options.clientY : data.xy[1];

            this.moveMouse(this.currentPosition, context.xy, callback, scope);
        },

        /**
        * This method will simulate a mouse move from current position relative by the x and y distances provided.
        * 
        * @param {Array} delta The array from 2 elements: [ dx, dy ], indicating the offset. 
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        */
        moveMouseBy : function(delta, callback, scope) {
            if (!delta) {
                throw 'Trying to call moveMouseBy without relative distances';
            }

            var targetXY = [ this.currentPosition[0] + delta[0], this.currentPosition[1] + delta[1] ];

            this.moveMouseTo(targetXY, callback, scope);
        },

        /**
        * Alias for moveMouseTo, this method will simulate a mouse move to an xy-coordinate or an element (the center of it)
        * @param {Siesta.Test.ActionTarget} target Target point to move the mouse to.
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        */
        moveCursorTo : function(target, callback, scope) {
            this.moveMouseTo.apply(this, arguments);
        },

        /**
        * This method will simulate a mouse move by an x a y delta amount
        * @param {Array} delta The delta x and y distance to move, e.g. [20, 20] for 20px down/right, or [0, 10] for just 10px down.
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        */
        moveMouseBy : function(delta, callback, scope) {
            this.moveCursorBy.apply(this, arguments);
        },

        /**
         * This method will simulate a mouse move by an x a y delta amount
         * @param {Array} delta The delta x and y distance to move, e.g. [20, 20] for 20px down/right, or [0, 10] for just 10px down.
         * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the operation is completed.
         * @param {Object} scope (optional) the scope for the callback
         */
        moveCursorBy : function(delta, callback, scope) {
            // Normalize target
            var target = [this.currentPosition[0] + delta[0], this.currentPosition[1] + delta[1]];

            this.moveMouse(this.currentPosition, target, callback, scope);
        },

        // private
        moveMouse : function(xy, xy2, callback, scope, precision, async, options) {
            var a           = this.beginAsync(),
                document    = this.global.document,
                me          = this,
                lastOverEl,
                overEls     = this.overEls;
            
            precision       = precision || me.dragPrecision;
            options         = options || {};
            
            var path        = this.getPathBetweenPoints(xy, xy2).concat([xy2]);
            
            var supports    = Siesta.Harness.Browser.FeatureSupport().supports

            var queue       = new Siesta.Util.Queue({
                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,
                
                interval        : async !== false ? this.dragDelay : 0,
                callbackDelay   : async !== false ? 50 : 0,
                
                observeTest     : this,
                
                processor       : function (data, index) {
                    var fromIndex = data.sourceIndex,
                        toIndex = data.targetIndex;

                    for (var j = fromIndex; j <= toIndex; j++) {
                        var point       = path[j];
                        var targetEl    = document.elementFromPoint(point[0], point[1]) || document.body;
                        
                        if (targetEl !== lastOverEl) {
                            if (supports.mouseEnterLeave) {
                                for (var i = overEls.length - 1; i >= 0; i--) {
                                    var el = overEls[i];
                                    if (el !== targetEl && me.$(el).has(targetEl).length === 0) {
                                        me.simulateEvent(el, "mouseleave", $.extend({ clientX: point[0], clientY: point[1], relatedTarget : targetEl}, options));
                                        overEls.splice(i, 1);
                                    }
                                }
                            }
                            if (lastOverEl) {
                                me.simulateEvent(lastOverEl, "mouseout", $.extend({ clientX: point[0], clientY: point[1], relatedTarget : targetEl}, options));
                            }
                            if (supports.mouseEnterLeave && jQuery.inArray(targetEl, overEls) < 0) {
                                me.simulateEvent(targetEl, "mouseenter", $.extend({ clientX: point[0], clientY: point[1], relatedTarget : lastOverEl}, options));
                            
                                overEls.push(targetEl);
                            }
                            me.simulateEvent(targetEl, "mouseover", $.extend({ clientX: point[0], clientY: point[1], relatedTarget : lastOverEl}, options));
                            lastOverEl = targetEl;
                        }
                     
                        me.simulateEvent(targetEl, "mousemove", $.extend({ clientX: point[0], clientY: point[1]}, options), j < toIndex);
                    }
                }
            });
            
            for (var i = 0, l = path.length; i < l; i += precision) {
                queue.addStep({
                    sourceIndex       : i,
                    targetIndex       : Math.min(i + precision, path.length - 1)
                });
            }

            queue.run(function () {
                me.endAsync(a);
                
                me.processCallbackFromTest(callback, null, scope || me)
            })
        },
        
        
        genericMouseClick : function (el, callback, scope, options, method) {
            if (jQuery.isFunction(el)) {
                scope       = callback;
                callback    = el; 
                el          = null;
            } 

            options = options || {};

            var data        = this.getNormalizedTopElementInfo(el, false, method);

            if (!data) {
                // No point in continuing
                callback && callback.call(scope || this);
                return;
            }

            options.clientX = options.clientX != null ? options.clientX : data.xy[0];
            options.clientY = options.clientY != null ? options.clientY : data.xy[1];

            // the asynchronous case
            if (this.moveCursorBetweenPoints && callback) {
                this.syncCursor(data.xy, this[ method ], [ data.el, callback, scope, options ]);
            } else {
                this[ method ](data.el, callback, scope, options);
            }
        },
        
        
        /**
         * This method will simulate a mouse click in the center of the specified DOM/Ext element.
         * 
         * Note, that it will first calculate the centeral point of the specified element and then 
         * will pick the top-most DOM element from that point. For example, if you will provide a grid row as the `el`,
         * then click will happen on top of the central cell, and then will bubble to the row itself.
         * In most cases this is the desired behavior.  
         * 
         * The following events will be fired, in order:  `mouseover`, `mousedown`, `mouseup`, `click`
         * 
         * Example:
         * 
         *      t.click(t.getFirstRow(grid), function () { ... })
         * 
         * The 1st argument for this method can be omitted. In this case, Siesta will use the current cursor position:
         * 
         *      t.click(function () { ... })
         *   
         * @param {Siesta.Test.ActionTarget} (optional) el One of the {@link Siesta.Test.ActionTarget} values to convert to DOM element 
         * @param {Function} callback (optional) A function to call when the condition has been met.
         * @param {Object} scope (optional) The scope for the callback
         * @param {Object} options (optional) Any options to use for the simulated DOM event
         */
        click: function (el, callback, scope, options) {
            this.genericMouseClick(el, callback, scope, options, 'simulateMouseClick')
        },

        
        /**
         * This method will simulate a mouse right click in the center of the specified DOM/Ext element.
         * 
         * Note, that it will first calculate the centeral point of the specified element and then 
         * will pick the top-most DOM element from that point. For example, if you will provide a grid row as the `el`,
         * then click will happen on top of the central cell, and then will bubble to the row itself.
         * In most cases this is the desired behavior.  
         * 
         * The following events will be fired, in order:  `mouseover`, `mousedown`, `mouseup`, `contextmenu`
         * 
         * Example:
         * 
         *      t.click(t.getFirstRow(grid), function () { ... })
         * 
         * The 1st argument for this method can be omitted. In this case, Siesta will use the current cursor position:
         * 
         *      t.click(function () { ... })
         *   
         * @param {Siesta.Test.ActionTarget} (optional) el One of the {@link Siesta.Test.ActionTarget} values to convert to DOM element 
         * @param {Function} callback (optional) A function to call when the condition has been met.
         * @param {Object} scope (optional) The scope for the callback
         * @param {Object} options (optional) Any options to use for the simulated DOM event
         */
        rightClick: function (el, callback, scope, options) {
            this.genericMouseClick(el, callback, scope, options, 'simulateRightClick')
        },

        
        /**
         * This method will simulate a mouse double click in the center of the specified DOM/Ext element.
         * 
         * Note, that it will first calculate the centeral point of the specified element and then 
         * will pick the top-most DOM element from that point. For example, if you will provide a grid row as the `el`,
         * then click will happen on top of the central cell, and then will bubble to the row itself.
         * In most cases this is the desired behavior.  
         * 
         * The following events will be fired, in order:  `mouseover`, `mousedown`, `mouseup`, `click`, `mousedown`, `mouseup`, `click`, `dblclick`
         * 
         * Example:
         * 
         *      t.click(t.getFirstRow(grid), function () { ... })
         * 
         * The 1st argument for this method can be omitted. In this case, Siesta will use the current cursor position:
         * 
         *      t.click(function () { ... })
         *   
         * @param {Siesta.Test.ActionTarget} (optional) el One of the {@link Siesta.Test.ActionTarget} values to convert to DOM element 
         * @param {Function} callback (optional) A function to call when the condition has been met.
         * @param {Object} scope (optional) The scope for the callback
         * @param {Object} options (optional) Any options to use for the simulated DOM event
         */
        doubleClick: function (el, callback, scope, options) {
            this.genericMouseClick(el, callback, scope, options, 'simulateDoubleClick')
        },

        /**
         * This method will simulate a mousedown event in the center of the specified DOM element.
         * @param {Siesta.Test.ActionTarget} el
         * @param {Object} options any extra options used to configure the DOM event
         */
        mouseDown: function (el, options) {
            var info        = this.getNormalizedTopElementInfo(el);

            if (!info) return;
            
            options         = options || {}

            options.clientX = options.clientX != null ? options.clientX : info.xy[0];
            options.clientY = options.clientY != null ? options.clientY : info.xy[1];
            el = el || info.el;

            this.simulateEvent(el, 'mousedown', options);
        },

         /**
         * This method will simulate a mousedown event in the center of the specified DOM element.
         * @param {Siesta.Test.ActionTarget} el
         * @param {Object} options any extra options used to configure the DOM event
         */
        mouseUp: function (el, options) {
            var info        = this.getNormalizedTopElementInfo(el);

            if (!info) return;
            
            options         = options || {}

            options.clientX = options.clientX != null ? options.clientX : info.xy[0];
            options.clientY = options.clientY != null ? options.clientY : info.xy[1];
            el = el || info.el;

            this.simulateEvent(el, 'mouseup', options);
        },

        /**
         * This method will simulate a mouseover event in the center of the specified DOM element.
         * @param {Siesta.Test.ActionTarget} el
         * @param {Object} options any extra options used to configure the DOM event
         */
        mouseOver: function (el, options) {
            var info        = this.getNormalizedTopElementInfo(el);

            if (!info) return;
            
            options         = options || {}

            options.clientX = options.clientX != null ? options.clientX : info.xy[0];
            options.clientY = options.clientY != null ? options.clientY : info.xy[1];

            this.simulateEvent(el, 'mouseover', options);
        },

        /**
         * This method will simulate a mouseout event in the center of the specified DOM element.
         * @param {Siesta.Test.ActionTarget} el
         * @param {Object} options any extra options used to configure the DOM event
         */        
        mouseOut: function (el, options) {
            var info        = this.getNormalizedTopElementInfo(el);

            if (!info) return;
            
            options         = options || {}

            options.clientX = options.clientX != null ? options.clientX : info.xy[0];
            options.clientY = options.clientY != null ? options.clientY : info.xy[1];

            this.simulateEvent(el, 'mouseout', options);
        },

        // private
        simulateRightClick: function (el, callback, scope, options) {
            var me          = this;
            
            var queue       = new Siesta.Util.Queue({
                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,
                
                interval        : callback ? 10 : 0,
                callbackDelay   : me.afterActionDelay,
                
                observeTest     : this,
                
                processor       : function (data) {
                    me.simulateEvent.apply(me, data);
                }
            })
            
            queue.addStep([ el, "mouseover", options, true ])
            queue.addStep([ el, "mousedown", options, false ])
            queue.addStep([ el, "mouseup", options, true ])
            
            queue.addStep({
                processor       : function () {
                    me.simulateEvent(el, "contextmenu", options, false);
//  do we need to focus the element on the right click?                  
//                    try { el.focus() } catch (e) {}
                }
            })
            
            var async   = me.beginAsync();
            
            queue.run(function () {
                me.endAsync(async);
                
                me.processCallbackFromTest(callback, null, scope || me)
            })
        }, 

        // private
        simulateMouseClick: function (el, callback, scope, options) {
            var me          = this;
            
            var queue       = new Siesta.Util.Queue({
                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,
                
                interval        : callback ? 10 : 0,
                callbackDelay   : me.afterActionDelay,
                
                observeTest     : this,
                
                processor       : function (data) {
                    me.simulateEvent.apply(me, data);
                }
            })
            
            queue.addStep([ el, "mouseover", options, true ])
            queue.addStep([ el, "mousedown", options, false ])
            queue.addStep([ el, "mouseup", options, true ])
            
            queue.addStep({
                processor       : function () {
                    me.simulateEvent(el, "click", options, false);
                    
                    try { el.focus() } catch (e) {}
                }
            })
            
            var async   = me.beginAsync();
            
            queue.run(function () {
                me.endAsync(async);
                
                me.processCallbackFromTest(callback, null, scope || me)
            })
        },

        // private
        simulateDoubleClick: function (el, callback, scope, options) {
            var me          = this;
            
            var queue       = new Siesta.Util.Queue({
                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,
                
                interval        : callback ? 10 : 0,
                callbackDelay   : me.afterActionDelay,
                
                observeTest     : this,
                
                processor       : function (data) {
                    me.simulateEvent.apply(me, data);
                }
            })
            
            queue.addStep([ el, "mouseover", options, true ])
            queue.addStep([ el, "mousedown", options, false ])
            queue.addStep([ el, "mouseup", options, true ])
            queue.addStep([ el, "click", options, true ])
            queue.addStep([ el, "mousedown", options, false ])
            queue.addStep([ el, "mouseup", options, true ])
            queue.addStep([ el, "click", options, true ])
            
            queue.addStep({
                processor       : function () {
                    me.simulateEvent(el, "dblclick", options, false);
                    
                    try { el.focus() } catch (e) {}
                }
            })
            
            var async   = me.beginAsync();
            
            queue.run(function () {
                me.endAsync(async);
                
                me.processCallbackFromTest(callback, null, scope || me)
            })
        }, 

        // private
        syncCursor : function(toXY, callback, args) {
            var me          = this
            var fromXY      = this.currentPosition;
            
            if (toXY[0] !== fromXY[0] || toXY[1] !== fromXY[1]) {

                this.moveMouse(fromXY, toXY, function() { 
                    callback && callback.apply(me, args);
                });
            } else 
                // already aligned
                callback && callback.apply(this, args);
        },


        /**
        * This method will simulate a drag and drop operation between either two points or two DOM elements.
        * The following events will be fired, in order:  `mouseover`, `mousedown`, `mousemove` (along the mouse path), `mouseup`
        * 
        * This method is deprecated in favor of {@link #dragTo} and {@link #dragBy} methods
        *   
        * @param {Siesta.Test.ActionTarget} source Either an element, or [x,y] as the drag starting point
        * @param {Siesta.Test.ActionTarget} target (optional) Either an element, or [x,y] as the drag end point
        * @param {Array} delta (optional) the amount to drag from the source coordinate, expressed as [x,y]. [50, 10] will drag 50px to the right and 10px down.
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the drag operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        * @param {Object} options any extra options used to configure the DOM event
        */
        drag: function (source, target, delta, callback, scope, options) {
            if (!source) {
                throw 'No drag source defined';
            }

            if (target) {
                this.dragTo(source, target, callback, scope, options);
            } else {
                this.dragBy(source, delta, callback, scope, options);
            }
        },

        /**
        * This method will simulate a drag and drop operation between either two points or two DOM elements.
        * The following events will be fired, in order:  `mouseover`, `mousedown`, `mousemove` (along the mouse path), `mouseup`
        *   
        * @param {Siesta.Test.ActionTarget} source {@link Siesta.Test.ActionTarget} value for the drag starting point
        * @param {Siesta.Test.ActionTarget} target {@link Siesta.Test.ActionTarget} value for the drag end point
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the drag operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        * @param {Object} options any extra options used to configure the DOM event
        * @param {Boolean} dragOnly true to skip the mouseup and not finish the drop operation.
        */
        dragTo : function(source, target, callback, scope, options, dragOnly) {
            if (!source) {
                throw 'No drag source defined';
            }
            if (!target) {
                throw 'No drag target defined';
            }
            options = options || {};

            // normalize source and target
            var sourceContext = this.getNormalizedTopElementInfo(source, false, 'dragTo: Source');
            var targetContext = this.getNormalizedTopElementInfo(target, false, 'dragTo: Target');

            if (!sourceContext || !targetContext) {
                // No point in continuing
                this.processCallbackFromTest(callback, null, scope || this);
                return;
            }

            var args = [sourceContext.xy, targetContext.xy, callback, scope, options, dragOnly];
            
            if (this.moveCursorBetweenPoints && callback) {
                this.syncCursor(sourceContext.xy, this.simulateDrag, args);
            } else {
                this.simulateDrag.apply(this, args)
            }
        },

        /**
        * This method will simulate a drag and drop operation from a point (or DOM element) and move by a delta.
        * The following events will be fired, in order:  `mouseover`, `mousedown`, `mousemove` (along the mouse path), `mouseup`
        *   
        * @param {Siesta.Test.ActionTarget} source {@link Siesta.Test.ActionTarget} value as the drag starting point
        * @param {Array} delta The amount to drag from the source coordinate, expressed as [x,y]. E.g. [50, 10] will drag 50px to the right and 10px down.
        * @param {Function} callback (optional) To run this method async, provide a callback method to be called after the drag operation is completed.
        * @param {Object} scope (optional) the scope for the callback
        * @param {Object} options any extra options used to configure the DOM event
        * @param {Boolean} dragOnly true to skip the mouseup and not finish the drop operation.
        */
        dragBy : function(source, delta, callback, scope, options, dragOnly) {
            if (!source) {
                throw 'No drag source defined';
            }
            if (!delta) {
                throw 'No drag delta defined';
            }

            var sourceContext = this.getNormalizedTopElementInfo(source, false, 'dragBy: Source');

            if (!sourceContext) {
                this.processCallbackFromTest(callback, null, scope || this);
                return;
            }

            var sourceXY = sourceContext.xy;
            targetXY = [ sourceXY[0] + delta[0], sourceXY[1] + delta[1] ];
            
            var args = [ sourceXY, targetXY, callback, scope, options, dragOnly ];
            
            if (this.moveCursorBetweenPoints && callback) {
                this.syncCursor(sourceXY, this.simulateDrag, args);
            } else {
                this.simulateDrag.apply(this, args)
            }
        },
        
        // private
        simulateDrag: function (sourceXY, targetXY, callback, scope, options, dragOnly) {
            var global = this.global,
                document = global.document,
                source,
                target;
            
            options = options || {};

            source = document.elementFromPoint(sourceXY[0], sourceXY[1]) || document.body;
            target = document.elementFromPoint(targetXY[0], targetXY[1]) || document.body;
            
            var me          = this;
            
            var queue       = new Siesta.Util.Queue({
                deferer         : this.originalSetTimeout,
                deferClearer    : this.originalClearTimeout,
                
                interval        : me.dragDelay,
                callbackDelay   : me.afterActionDelay,
                
                observeTest     : this
            });
            
            queue.addStep({
                processor : function () {
                    me.simulateEvent(source, "mouseover", $.extend({ clientX: sourceXY[0], clientY: sourceXY[1]}, options));
                }
            });
            
            queue.addStep({
                processor : function () {
                    // Fetch source el again since the mouseover might trigger another element to go visible.
                    source = document.elementFromPoint(sourceXY[0], sourceXY[1]) || document.body;
                    me.simulateEvent(source, "mouseover", $.extend({ clientX: sourceXY[0], clientY: sourceXY[1]}, options));
                }
            });
            
            queue.addStep({
                processor : function () {
                    me.simulateEvent(source, "mousedown", $.extend({ clientX: sourceXY[0], clientY: sourceXY[1]}, options));
                }
            });
            
            queue.addStep({
                isAsync     : true,
                
                processor   : function (data) {
                    me.moveMouse(sourceXY, targetXY, data.next, this, null, true, options);
                }
            });
            
            var el;
            
            queue.addStep({
                processor : function () {
                    el = document.elementFromPoint(targetXY[0], targetXY[1]) || document.body;
                    me.simulateEvent(el, 'mouseover', $.extend({ clientX: targetXY[0], clientY: targetXY[1] }, options)); 
                }
            });
            
            if (!dragOnly) {
                queue.addStep({
                    processor : function () {
                        me.simulateEvent(el, 'mouseup', $.extend({ clientX: targetXY[0], clientY: targetXY[1] }, options)); 
                    }
                });
            
//            queue.addStep({
//                processor : function () {
//                    if (me.simulateEvent(el, 'click', $.extend({ clientX: targetXY[0], clientY: targetXY[1] }, options)); 
//                }
//            });
            }
            
            
            var async       = this.beginAsync();
            
            queue.run(function () {
                me.endAsync(async)
                
                me.processCallbackFromTest(callback, null, scope || me)
            });
        }
    }
});

