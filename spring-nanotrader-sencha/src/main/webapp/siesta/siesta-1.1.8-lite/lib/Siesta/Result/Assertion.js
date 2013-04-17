/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Result.Assertion', {
    
    isa : Siesta.Result,
    

    has : {
        name        : null,
        
        passed      : null,
        
        annotation  : null,
        
        index       : null,
        sourceLine  : null,
        
        isSkipped   : false,
        isTodo      : false,
        isWaitFor   : false,
        
        completed   : false     // for waitFor assertions
    },
    
    
    methods : {
        
        toString : function () {
            var text = (this.isTodo ? 'TODO: ' : '') + (this.passed ? 'ok ' : 'fail ') + this.index + ' - ' + this.description
            
            if (this.annotation) text += '\n' + this.annotation
            
            return text
        }
    }
})

