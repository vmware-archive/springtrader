/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.MouseVisualizer', {

    displayClickIndicator   : true,

    ghostCursor             : null,
    viewport                : null,

    onEventSimulatedListener    : null,
    onTestFinishedListener      : null,
    
    harness                     : null,
    host                        : null,
    
    isCursorVisible             : false,
    
    constructor : function(harness) {
        this.harness = harness;
        this.callParent([]);
    },

    init : function (host) { 
        this.host = host;
        
        if (!this.ghostCursor) {
            this.ghostCursor = Ext.getBody().createChild({
                tag : 'div',
                cls : 'ghost-cursor'
            });
        }
        
        this.harness.on('testframeshow', this.onTestFrameShow, this);
        this.harness.on('testframehide', this.onTestFrameHide, this);
    },
    
    
    showCursor : function () {
        if (this.isCursorVisible) return
        
        this.isCursorVisible = true
        
        var ghostCursor     = this.ghostCursor
        
        // Cancel any ongoing fadeOut operation
        if (ghostCursor.stopAnimation) {
            ghostCursor.stopAnimation();
            ghostCursor.setOpacity(1);
        }
        
        ghostCursor.show();
        ghostCursor.setStyle({
            display : 'block'
        });
    },
    
    
    hideCursor : function () {
        if (!this.isCursorVisible) return
        
        this.isCursorVisible = false
        
        this.ghostCursor.setStyle({
            display : 'none'
        });
    },

    onTestFinished : function(meta, test) {
        var me = this;
        clearTimeout(me.hideTimer);
        
        var ghostCursor = me.ghostCursor

        me.hideTimer = setTimeout(function() {
            // ExtJS branch
            if (ghostCursor.fadeOut) {
                ghostCursor.fadeOut({ duration : 2000, callback : function () {
                    me.hideCursor()
                } });
            } else {
                // ST branch
                me.hideCursor()
            }
        }, 2000);
    },
    
    resetListeners : function () {
        if (this.onEventSimulatedListener)  {
            this.onEventSimulatedListener.remove()
            this.onEventSimulatedListener = null
        }
        
        if (this.onTestFinishedListener)    {
            this.onTestFinishedListener.remove()
            this.onTestFinishedListener = null
        }
    },
    
    
    onTestFrameHide : function (event) {
        var test    = event.source

        this.resetListeners()
        
        this.hideCursor()
    },
    

    onTestFrameShow : function (event) {
        var test    = event.source

        this.resetListeners()
        
        if (this.host.isTestRunningVisible(test)) {
            this.onEventSimulatedListener   = test.on('eventsimulated', this.onEventSimulated, this);
            this.onTestFinishedListener     = test.on('testfinalize', this.onTestFinished, this);
        }
    },

    onEventSimulated : function(meta, test, el, type, evt) {
        // Make sure this test is visible in DOM right now
        if (test.scopeProvider.iframe && type.match('touch|mouse|click|contextmenu') && this.host.isTestRunningVisible(test) &&
            Ext.isNumber(evt.clientX) && Ext.isNumber(evt.clientY)) {
            var bd = Ext.getBody(),
                frameOffsets = Ext.fly(test.scopeProvider.iframe).getOffsetsTo(bd),
                x = evt.clientX + frameOffsets[0],
                y = evt.clientY + frameOffsets[1];
    
            this.updateGhostCursor(type, x, y);
             
            // Touch vs Ext
            if ((Ext.supports && Ext.supports.Transitions) || (Ext.feature && Ext.feature.has.CssTransitions)) {

                 if (this.displayClickIndicator && (
                    type === 'click'        || 
                    type === 'dblclick'     || 
                    type === 'touchstart'   || 
                    type === 'touchend'     || 
                    type === 'mousedown'    || 
                    type === 'mouseup'      || 
                    type === 'contextmenu')) {
                    this.showClickIndicator(type, x, y);
                }
            }
        }
    },

    /*
    * This method shows a fading circle at the position of click/dblclick/mousedown/contextmenu
    * @param {String} type The name of the event
    * @param {Number} x The x coordinate of the event
    * @param {Number} y The y coordinate of the event
    */
    showClickIndicator : function(type, x, y) {
        var clickCircle = Ext.getBody().createChild({
            tag : 'div',
            cls : 'ghost-cursor-click-indicator ' ,
            style : 'left:' + x + 'px;top:' + y + 'px'
        });
        
        // need to a delay to make it work in FF
        setTimeout(function() {
                clickCircle.addCls('ghost-cursor-click-indicator-big');
        }, 5);
    },

    /*
    * This method updates the ghost cursor position and appearance
    * @param {String} type The name of the event
    * @param {Number} x The x coordinate of the event
    * @param {Number} y The y coordinate of the event
    */
    updateGhostCursor: function (type, x, y) {
        if (!this.isCursorVisible) this.showCursor()
        
//        this.ghostCursor.setXY([x-5, y]);        // -5 to get index finger aligned correctly
        
        this.ghostCursor.setStyle({
            '-webkit-transform' : 'translate3d(' + (x - 5) + 'px, ' + y + 'px, 0px)',
            '-moz-transform'    : 'translate3d(' + (x - 5) + 'px, ' + y + 'px, 0px)',
            '-o-transform'      : 'translate3d(' + (x - 5) + 'px, ' + y + 'px, 0px)',
            'transform'         : 'translate3d(' + (x - 5) + 'px, ' + y + 'px, 0px)'
        })
        
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
   
        switch(type) {
            case 'touchstart':
            case 'mousedown':
                this.ghostCursor.addCls('ghost-cursor-press');
            break;

            case 'dblclick':
                this.ghostCursor.addCls('ghost-cursor-press');
                Ext.Function.defer(this.ghostCursor.removeCls, 40, this.ghostCursor, ['ghost-cursor-press']);
            break;

            case 'touchend':
            case 'mouseup':
            case 'click':
                this.ghostCursor.removeCls('ghost-cursor-press');
            break;
        
            case 'contextmenu' :
            break;
        }
    }
});
