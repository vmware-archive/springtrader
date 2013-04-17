/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI_Mobile.ResultList', {

    extend          : 'Ext.dataview.List',

    alias           : 'widget.resultlist',

    config : {
        itemTpl         : new Ext.XTemplate(
            '<div class="{[this.getRowClass(values)]}">{description} {[values.annotation ? ("<br/>" + Ext.String.htmlEncode(values.annotation)) : ""]}</div>', 
            {
                getRowClass: function(data){
                    if (data.type === 'Siesta.Result.Diagnostic') {
                        return 'tr-diagnostic-row';
                    } else if (data.type === 'Siesta.Result.Summary') {
                        return 'tr-summary-row ' + (data.summaryFailure ? ' tr-summary-failure' : '');
                    } else if (data.isWaitFor && data.completed && data.passed){
                        return 'tr-assertion-row tr-row-passed-wait-assertion'
                    } else {
                        return !data.passed && !data.isTodo ? 'tr-assertion-row tr-row-failed-assertion' : 'tr-assertion-row tr-row-passed-assertion' 
                    }
                }
            }
        ),
        cls             : 'result-list',
        testRecord      : null
    },

    
    constructor : function() {
        this.callParent(arguments);
    },

    
    getIFrame : function () {
        if (this.testRecord) {
            var test = this.testRecord.get('test');
    
            return test && test.scopeProvider && test.scopeProvider.iframe;
        }
        return null;
    },

    
    alignIFrame : function () {
        var iframe          = this.getIFrame();
        
        iframe && Ext.fly(iframe).addCls('active')
        
        var test    = this.testRecord && this.testRecord.get('test')
        
        if (test) {
            test.fireEvent('testframeshow')
        }
    },

    
    hideIFrame : function () {
        var iframe          = this.getIFrame()
    
        iframe && Ext.fly(iframe).removeCls('active');
        
        var test    = this.testRecord && this.testRecord.get('test')
        
        if (test) {
            test.fireEvent('testframehide')
        }
    },

    
    toggleFrameVisible : function() {
        var iframe          = this.getIFrame()
        iframe && Ext.fly(iframe).toggleCls('active');
    },

    
    isFrameVisible : function () {
        var iframe          = this.getIFrame()
        
        return iframe && Ext.fly(iframe).hasCls('active') || false;
    },

    
    showTest : function (testFile) {
        this.addCls('result-list-running');

        if (this.testRecord !== testFile) {
            this.hideIFrame();
            this.testRecord = testFile;
        }

        var url = testFile.get('url');
     
//        Nickolay: Had to disable this line, do we need it?
//        this.container.innerElement.setHtml('');
        this.setStore(testFile.get('assertionsStore'));

        this.testUrl = url;
        
        this.alignIFrame();
    }
});