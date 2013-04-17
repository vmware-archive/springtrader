/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Class('Siesta.Content.Preset', {
    
    has : {
        preload                 : Joose.I.Array,
        
        resources               : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            var me              = this
            
            Joose.A.each(this.preload, function (preloadDesc) {
                
                me.addResource(preloadDesc)
            })
        },
        
        
        isCSS : function (url) {
            return /\.css(\?.*)?$/i.test(url)
        },
        
        
        getResourceFromDescriptor : function (desc) {
            if (typeof desc == 'string')
            
                if (this.isCSS(desc))
                    return new Siesta.Content.Resource.CSS({
                        url         : desc
                    })
                else
                    return new Siesta.Content.Resource.JavaScript({
                        url         : desc
                    })
                    
            else if (desc.text) 
                return new Siesta.Content.Resource.JavaScript({
                    content         : desc.text
                })
                    
            else if (desc.type == 'css') 
                return new Siesta.Content.Resource.CSS({
                    content         : desc.content
                })
                
            else if (desc.type == 'js') 
                return new Siesta.Content.Resource.JavaScript({
                    content         : desc.content
                })
                
            else 
                throw "Incorrect preload descriptor:" + desc 
        },
        
        
        addResource : function (desc) {
            var resource    = (desc instanceof Siesta.Content.Resource) && desc || this.getResourceFromDescriptor(desc)
            
            this.resources.push(resource)
            
            return resource
        },
        
        
        eachResource : function (func, scope) {
            return Joose.A.each(this.resources, func, scope || this)
        },
        
        
        // deprecated - seems preset don't need to know about scope providers
        prepareScope : function (scopeProvider, contentManager) {
            
            this.eachResource(function (resource) {
                
                if (contentManager.hasContentOf(resource))
                    scopeProvider.addPreload({
                        type        : (resource instanceof Siesta.Content.Resource.CSS) ? 'css' : 'js', 
                        content     : contentManager.getContentOf(resource)
                    })
                else 
                    scopeProvider.addPreload(resource.asDescriptor())
            })
        }
    }
        
})

