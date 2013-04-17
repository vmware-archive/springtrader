/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Content.Manager', {
    
    has : {
        disabled        : false,
        
        presets         : {
            require     : true
        },
        
        urls            : Joose.I.Object,
        
        maxLoads        : 5
    },
    
    
    methods : {
        
        cache : function (callback, errback, ignoreErrors) {
            if (this.disabled) {
                callback && callback()
                
                return
            }
            
            var urls    = this.urls
            var me      = this
            
            Joose.A.each(this.presets, function (preset) {
                
                preset.eachResource(function (resource) {
                    
                    if (resource.url) urls[ resource.url ] = null
                })
            })
            
            var loadCount   = 0
            var errorCount  = 0
            
            var total       = 0
            var urlsArray   = []
            Joose.O.each(urls, function (value, url) { total++; urlsArray.push(url) })
            
            if (total) {
                
                var loadSingle = function (url) {
                    if (!url) return
                    
                    me.load(url, function (content) {
                        if (errorCount) return
                        
                        urls[ url ] = content
                        
                        if (++loadCount == total) 
                            callback && callback()
                        else
                            loadSingle(urlsArray.shift())
                    
                    }, ignoreErrors ? function () {
                        
                        if (++loadCount == total) 
                            callback && callback()
                        else
                            loadSingle(urlsArray.shift())
                        
                    } : function () {
                        errorCount++
                        
                        errback && errback(url)
                    })
                }
                
                // running only `maxLoads` "loading threads" at the same time
                for (var i = 0; i < this.maxLoads; i++) loadSingle(urlsArray.shift())
                
            } else
                callback && callback()
        },
        
        
        load : function (url, callback, errback) {
            throw "abstract method `load` called"
        },
        
        
        hasContentOf : function (url) {
            if (url instanceof Siesta.Content.Resource) url = url.url
            
            return typeof this.urls[ url ] == 'string'
        },
        
        
        getContentOf : function (url) {
            if (url instanceof Siesta.Content.Resource) url = url.url
            
            return this.urls[ url ]
        }
    }
})

