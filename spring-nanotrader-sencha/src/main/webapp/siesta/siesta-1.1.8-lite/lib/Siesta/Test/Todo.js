/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Role('Siesta.Test.Todo', {
    
    has : {
        parent              : null
    },
    
    
    methods : {
        
        getExceptionCatcher : function () {
            return this.parent.getExceptionCatcher()
        },
        
        
        getTestErrorClass : function () {
            return this.parent.getTestErrorClass()
        },
        
        
        getStartTestAnchor : function () {
            return this.parent.getStartTestAnchor()
        },
        
        
        addResult : function (result) {
            if (result instanceof Siesta.Result.Assertion) result.isTodo = true
            
            this.parent.addResult(result)
        },
        
        
        beginAsync : function (time) {
            return this.parent.beginAsync(time)
        },
        
        
        endAsync : function (index) {
            return this.parent.endAsync(index)
        }
        
    }
        
})
//eof Siesta.Test
