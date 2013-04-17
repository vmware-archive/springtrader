/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.Component.override({

    slot            : null,
    __COLLECTOR__   : null,


    onRemoved : function() {
        if (this.__COLLECTOR__) {
            delete this.__COLLECTOR__.slots[this.slot]
            delete this.__COLLECTOR__
        }
    
        this.callOverridden(arguments)
    },


    beforeDestroy : function () {
        if (this.__COLLECTOR__) {
            delete this.__COLLECTOR__.slots[this.slot]
            delete this.__COLLECTOR__
        }
    
        this.callOverridden(arguments)
    }
})



Ext.Container.override({

    slots       : null,


    onAdd : function () {
    
        this.cascade(function (comp) {
            if (comp.slot && !comp.__COLLECTOR__) {
        
                var parentWithSlots = comp.__COLLECTOR__ = comp.up('{slots}')
            
                if (parentWithSlots) parentWithSlots.slots[ comp.slot ] = comp
            }
        })
    },


    initComponent : function () {
        if (this.slots) this.slots = {}
    
        this.callOverridden()
    }
})
