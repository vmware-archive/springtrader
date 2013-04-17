/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Result.Diagnostic', {
    
    isa : Siesta.Result,
    
    has : {
        isWarning       : false,
        
        isSimulatedEvent : false,

        // Used by simulated events
        sourceX      : null,
        sourceY      : null,
        type         : null
    },

    methods : {
        
        toString : function () {
            return '# ' + this.description
        }
    }    
});

