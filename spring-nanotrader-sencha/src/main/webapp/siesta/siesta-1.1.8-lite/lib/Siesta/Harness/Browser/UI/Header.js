/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.Header', {
    extend              : 'Ext.Panel',
    
    region              : 'north',
    slot                : 'title',
                
    cls                 : 'tr-title',
    html                : '<a href="http://bryntum.com"><div class="tr-logo"></div></a>',
    border              : false,
    height              : 115, 
    buttonAlign         : 'center',
    minButtonWidth      : 42,
    
    viewport            : null,
    stateConfig         : null,
    
    
    initComponent : function() {
        var state = this.stateConfig;

        Ext.apply(this, {
            buttons    : [
                {
                    xtype       : 'label',
                    cls         : "tr-version-indicator",
                    html        : 'v.' + (Siesta.meta.VERSION || "1.0.0")
                },
                {
                    iconCls     : 'tr-icon-run-checked',
                    tooltip     : 'Run checked',
                    scale       : 'large',
                    actionName  : 'run-checked',
                    scope       : this,
                    handler     : this.onBtnClicked
                },
                {
                    iconCls     : 'tr-icon-run-failed',
                    tooltip     : 'Run failed',
                    scale       : 'large',
                    actionName  : 'run-failed',
                    scope       : this,
                    handler     : this.onBtnClicked
                },
                {
                    iconCls     : 'tr-icon-run-all',
                    tooltip     : 'Run all',
                    scale       : 'large',
                    actionName  : 'run-all',
                    scope       : this,
                    handler     : this.onBtnClicked
                },
                {
                    iconCls     : 'tr-icon-stop',
                    tooltip     : 'Stop',
                    scale       : 'large',
                    actionName  : 'stop',
                    scope       : this,
                    handler     : this.onBtnClicked
                },
                {
                    tooltip     : 'Options...',
                    iconCls     : 'tr-icon-options',
                    scale       : 'large',
                                
                    menu     : new Ext.menu.Menu({
                        defaults : {
                            scope           : this,
                            checkHandler    : this.onOptionChange
                        },
                        listeners : {
                            beforeshow  : this.onSettingsMenuBeforeShow,
                            scope       : this
                        },
                        items : [
                            {
                                text        : 'View DOM',
                                option      : 'viewDOM',
                                checked     : state.viewDOM
                            },
                            {
                                text        : 'Transparent exceptions',
                                option      : 'transparentEx',
                                checked     : state.transparentEx
                            },
                            {
                                text        : 'Cache preloads',
                                option      : 'cachePreload',
                                checked     : state.cachePreload
                            },
                            {
                                text        : 'Auto launch',
                                option      : 'autoRun',
                                checked     : state.autoRun
                            },
                            {
                                text        : 'Keep results',
                                option      : 'keepResults',
                                checked     : state.keepResults
                            },
                            {
                                text        : 'Speed run',
                                option      : 'speedRun',
                                checked     : state.speedRun
                            },
                            {
                                text        : 'Break on fail',
                                option      : 'breakOnFail',
                                checked     : state.breakOnFail
                            }
                        ]
                    })
                }
            ].concat(this.buttons || [])
        });
        this.callParent();
    },
    
    
    afterRender : function () {
        this.callParent(arguments);
        
        var logoEl  = document.createElement('div')
        
        logoEl.className    = "tr-siesta-logo"
        logoEl.innerHTML    = '&nbsp;'
        
        this.el.appendChild(logoEl)
        
        Ext.get(logoEl).on('click', function () { this.fireEvent('logoclick', this); }, this)
    },
    

    onBtnClicked : function(btn) {
        if(btn.actionName) { 
            this.fireEvent('buttonclick', this, btn, btn.actionName); 
        }
    },
    
    onSettingsMenuBeforeShow : function(menu) {
        this.fireEvent('beforesettingsmenushow', this, menu); 
    },

    onOptionChange : function(button, state) {
        this.fireEvent('optionchange', this, button.option, state); 
    }
})
//eof Siesta.Harness.Browser.UI.Header
