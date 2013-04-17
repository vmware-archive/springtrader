/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
 * 
@class Siesta.Test.ExtJS
@extends Siesta.Test.Browser
@mixin Siesta.Test.ExtJSCore
@mixin Siesta.Test.ExtJS.Ajax
@mixin Siesta.Test.ExtJS.Observable
@mixin Siesta.Test.ExtJS.FormField
@mixin Siesta.Test.ExtJS.Component
@mixin Siesta.Test.ExtJS.Element 
@mixin Siesta.Test.ExtJS.Store 
@mixin Siesta.Test.ExtJS.DataView
@mixin Siesta.Test.ExtJS.Grid

A base class for testing browser and ExtJS applications. It inherit from {@link Siesta.Test.Browser} 
and adds various ExtJS specific assertions.

This file is a reference only, for a getting start guide and manual, please refer to <a href="#!/guide/siesta_getting_started">Getting Started Guide</a>.

*/
Class('Siesta.Test.ExtJS', {
    
    isa         : Siesta.Test.Browser,
        
    does        :  [ 
        Siesta.Test.ExtJSCore, 
        Siesta.Test.ExtJS.Component, 
        Siesta.Test.ExtJS.Element, 
        Siesta.Test.ExtJS.FormField, 
        Siesta.Test.ExtJS.Observable, 
        Siesta.Test.ExtJS.Store, 
        Siesta.Test.ExtJS.Grid,
        Siesta.Test.ExtJS.DataView,
		Siesta.Test.ExtJS.Ajax
    ],
    
    methods : {
        
        getExtBundlePath : function() {
            var path;
            var testDescriptor      = this.harness.getScriptDescriptor(this.url)
            
            while (testDescriptor && !path) {
                if (testDescriptor.preload) {
                    Joose.A.each(testDescriptor.preload, function (url) {
                        if (url.match && url.match(/ext(?:js)?-\d\.\d+(?:\.\d+)?.*?\/ext-all(?:-debug)?\.js/)) {
                            path = url;
                            return false;
                        }
                    });
                }
                testDescriptor = testDescriptor.parent;
            }

            return path;
        },


        getExtBundleFolder : function() {
            var folder;
            var testDescriptor      = this.harness.getScriptDescriptor(this.url)

            while (testDescriptor && !folder) {
                if (testDescriptor.preload) {
                    Joose.A.each(testDescriptor.preload, function (url) {
                        var regex = /(.*ext(?:js)?-\d\.\d+(?:\.\d+)?.*?)\/ext-all(?:-debug)?\.js/;
                        var match = regex.exec(url);
                
                        if (match) {
                           folder = match[1];
                        }
                    });
                }
                testDescriptor = testDescriptor.parent;
            }

            return folder;
        }
    }
})
