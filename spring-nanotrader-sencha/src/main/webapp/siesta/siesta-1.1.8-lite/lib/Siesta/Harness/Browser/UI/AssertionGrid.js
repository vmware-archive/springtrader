/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.AssertionGrid', {

    extend      : 'Ext.grid.Panel',
    
    cls         : 'siesta-assertion-grid hide-simulated',
    alias       : 'widget.assertiongrid',

    enableColumnHide    : false,
    enableColumnMove    : false,
    enableColumnResize  : false,
    
    sortableColumns     : false,
    border              : false,
    forceFit            : true,
    minWidth            : 100,
    
    initComponent : function() {
        
        Ext.apply(this, {
            resultTpl   : new Ext.XTemplate(
                '<span class="assertion-index">{index}</span><div class="assertion-status"></div><span class="assertion-text">{[this.getDescription(values)]}</span>{[this.getAnnotation(values)]}',
                {
                    getDescription : function (data) {
                        return data.isWarning ? 'WARN: ' + data.description : data.description
                    },
                    getAnnotation : function(data) {
                        if (data.annotation) {
                            return '<pre class="tr-assert-row-annontation">' + Ext.String.htmlEncode(data.annotation) + '</pre>';
                        }
                        return '';
                    }
                }
            ),

            columns     : [
                {
                    header      : 'Results',
                    flex        : 1,
                    scope       : this,
                    dataIndex   : 'passed',
                    renderer    : this.resultRenderer,
                    menuDisabled: true,
                    sortable : false
                } 
            ],
                    
            viewConfig : {
                enableTextSelection     : true,
                stripeRows              : false,
                disableSelection        : true,
                markDirty               : false,
                
                // this should be kept `false` - otherwise assertion grid goes crazy, see #477 
                deferInitialRefresh     : false,
                
                getRowClass             : function(record, rowIndex, rowParams, store){
                    switch (record.data.type) {
                        case 'Siesta.Result.Diagnostic': 
                            return 'tr-diagnostic-row';
                    
                        case 'Siesta.Result.Summary': 
                            return 'tr-summary-row ' + (record.data.summaryFailure ? ' tr-summary-failure' : '');
                    
                        default:
                            if (record.data.isWaitFor && !record.data.completed) {
                                return 'tr-waiting-row';
                            } else {
                                return !record.get('passed') && !record.get('isTodo') ? 'tr-row-failed-assertion' : '' 
                            }
                        break;
                    }
                }
            }
        });

        this.callParent(arguments);
    },           
                
    resultRenderer : function (value, metaData, record, rowIndex, colIndex, store) {
        if (record.data.isWaitFor) {
            if (!record.data.completed) {
                metaData.tdCls = 'tr-assert-row-waiting-cell';
            } else {
                metaData.tdCls = value ? 'tr-assert-row-waiting-ok-cell' : 'tr-assert-row-bug-cell';
            }
        } else if (record.data.isTodo) {
            metaData.tdCls = value ? 'tr-assert-row-ok-todo-cell' : 'tr-assert-row-bug-todo-cell';
        } else if (record.data.isWarning) {
            
            metaData.tdCls = 'tr-warning'
            
        } else {
            metaData.tdCls = value ? 'tr-assert-row-ok-cell' : 'tr-assert-row-bug-cell';
        }

        return this.resultTpl.apply(record.data);
    }
})
