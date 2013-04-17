/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
(function () {
    var config = {
        idProperty : 'index',

        fields : [
            'index',
            'summaryFailure',
            { name : 'passed', type : 'boolean', defaultValue : false  },
            { name : 'isTodo', type : 'boolean', defaultValue : false  },
            { name : 'isWaitFor', type : 'boolean', defaultValue : false  },
            { name : 'completed', type : 'boolean', defaultValue : false  },
            'description',
            'annotation',
            'type',
            'sourceLine',
            'isWarning',

            // For logging simulated events (will also have a type as for diagnostic messages)
            { name : 'isSimulatedEvent', type : 'boolean', defaultValue : false },
            'eventType'
        ]
    };

    Ext.define('Siesta.Harness.Browser.Model.Assertion', Ext.apply({
        extend : 'Ext.data.Model'
    }, (Ext.getVersion && Ext.getVersion('touch')) ? { config : config } : config));
})();
