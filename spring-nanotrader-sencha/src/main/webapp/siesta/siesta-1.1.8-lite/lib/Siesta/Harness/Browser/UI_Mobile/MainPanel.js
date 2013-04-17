/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI_Mobile.MainPanel', {

    extend          : 'Ext.Panel',
    alias           : 'widget.mainpanel',
    
    config : {
        harness         : null,
        layout          : {
            type        : 'card',
            animation   : {
                type        : 'slide',
                direction   : 'left'
            }
        },
        testsStore      : null,
        slots           : true
    },

    constructor : function (config) {
        delete config.title;

        Ext.apply(this, config);
        this.lastTests = [];

        var treeData = this.buildTreeData({
            id          : 'root',
            group       : 'test suite' + this.title,
            items       : this.harness.descriptors
        });

        var testsStore      = this.testsStore = new Ext.data.TreeStore({
            model           : 'Siesta.Harness.Browser.Model.TestFile',
        
            sortOnLoad      : false
        });

        var data            = []
        var root            = testsStore.getRoot()
        
        root.appendChild(treeData.children)
        
        root.cascadeBy(function (node) {
            if (node != root) data.push(node)
        })
        
        var flatStore = this.flatStore = new Ext.data.Store({
            model           : 'Siesta.Harness.Browser.Model.TestFile'
        });
        
        flatStore.add(data)
        
        Ext.apply(config, {
            plugins         : new Siesta.Harness.Browser.UI.MouseVisualizer(this.harness)
        });
       
        this.callParent(arguments);
        
        this.summaryButton = Ext.create('Siesta.Harness.Browser.UI_Mobile.ResultSummaryButton', {
            scope       : this,
            handler     : this.toggleResults
        });

        this.suiteBar = new Ext.Toolbar({
            xtype: 'toolbar',
            docked : 'top',
            cls : 'suite-bar',
            items : [
                { 
                    ui          : 'back', 
                    group       : 'suitebtn',
                    text        : 'Back',
                    disabled    : true,
                    
                    handler     : this.goBack,
                    scope       : this
                },
                {
                    cls         : 'tr-icon-run-all',
                    group       : 'suitebtn',
                    scope       : this,
                    handler     : this.runAll,
                    text        : '&nbsp;',
                    width       : 50
                }
            ].concat(                
                Ext.os.is.Desktop ? [ 
                {
                    cls         : 'tr-icon-run-failed',
                    group       : 'suitebtn',
                    scope       : this,
                    text        : '&nbsp;',
                    handler     : this.runFailed,
                    width       : 50
                },
                {
                    cls         : 'tr-icon-stop',
                    group       : 'suitebtn',
                    scope       : this,
                    text        : '&nbsp;',
                    handler     : this.stopSuite,
                    width       : 50
                }] : []
            ).concat(
                { 
                    iconMask    : true, 
                    iconCls     : 'refresh', 
                    group       : 'suitebtn',
                    handler     : this.rerunTest,  
                    scope       : this 
                },
                { xtype : 'spacer' },
                this.summaryButton
            )
        });

        this.testList = Ext.create('Siesta.Harness.Browser.UI_Mobile.TestList', {
            xtype       : 'testlist',
                        
            listeners   : {
                itemdoubletap       : this.onItemDoubleTap,
                disclose            : this.onItemDisclose,
                            
                scope               : this
            },
                        
            store       : this.flatStore
        });

        this.resultList = Ext.create('Siesta.Harness.Browser.UI_Mobile.ResultList');

        Ext.destroy(Ext.get('splashLoader'));

        this.add([
            this.suiteBar,
            this.testList,
            this.resultList
        ]);
    },

    buildTreeData : function (descriptor) {
        var data    = {
            id          : descriptor.id,
            title       : descriptor.group || descriptor.title || descriptor.name || descriptor.url.replace(/(?:.*\/)?([^/]+)$/, '$1'),
            descriptor  : descriptor
        }
    
        var me              = this
        var prevId          = data.id
        var collapsedNodes  = this.collapsedNodes || {}
    
        if (descriptor.group) {
        
            var children    = []
        
            Ext.each(descriptor.items, function (desc) {
                children.push(me.buildTreeData(desc))
            })
        
            Ext.apply(data, {
                folderStatus    : 'yellow',
                
                expanded        : true,
            
                children        : children,
                leaf            : false
            })
        
        } else {
            Ext.apply(data, {
                url             : descriptor.url,
            
                leaf            : true,
            
                passCount       : 0,
                failCount       : 0,
            
                time            : 0,
            
                assertionsStore : new Ext.data.Store({
                    model       : 'Siesta.Harness.Browser.Model.Assertion'
                })
            })
        }
    
        return data
    },

    onTestSuiteStart : function (descriptors) {
        var harness             = this.harness
        var flatStore           = this.flatStore
        
        this.summaryButton.resetSummary();

        this.resetDescriptors(descriptors);
        
        this.lastTests = [];
        var me = this;

        Joose.A.each(harness.flattenDescriptors(descriptors), function (descriptor) {
            var test = flatStore.getById(descriptor.id);
            
            me.lastTests.push(test);

            test.set({
                isMissing   : descriptor.isMissing,
                isStarting  : true
            })
        });
        this.hideSuiteButtons();
    },

    setTitle : function(title) {
        this.suiteBar.setTitle(title);
    },

    goBack : function (backButton) {
        if (this.getActiveItem() === this.testList) {
//            var item = this.testList.getActiveItem();
//            
//            var parent = item.getParent();
//            if (parent) {
//                this.testList.onBackTap();
//            }
        } else {
            this.getResultList().hideIFrame();
            
            this.getLayout().getAnimation().setReverse(true)
            
            this.setActiveItem(0);
            backButton.disable()
        }
    },

    resetDescriptors : function (descriptors) {
        var flatStore           = this.flatStore
        
        Joose.A.each(this.harness.flattenDescriptors(descriptors), function (descriptor) {
            var testRecord = flatStore.getById(descriptor.id);
            
            if (testRecord.isLeaf()) testRecord.get('assertionsStore').removeAll(true)
            
            testRecord.reject(true);
            
            // HACK mark record as not having any test results
            testRecord.isCleared = true
        });
    },

    
    onTestSuiteEnd : function (descriptors) {
        this.showSuiteButtons();
        this.setTitle('');
        
        Ext.select('.ghost-cursor-click-indicator').each(function(el) { el.destroy(); });
    },
    
    
    toggleResults : function() {
        if (this.lastTests.length > 1) {
            var store = this.createFailedAssertionsStore(this.lastTests);
            if (store.getCount() === 0) {
                Ext.Msg.alert('All tests passed.');
            } else {
                this.resultList.setStore(store);
                this.showResultPanel();
            }
        } else {
            this.resultList.toggleFrameVisible();
        }
    },

    
    createFailedAssertionsStore : function(tests) {
        var store = new Ext.data.Store({
            model       : 'Siesta.Harness.Browser.Model.Assertion'
        });

        Ext.each(tests, function(t) {
            var failed = t.getFailedAssertions();

            if (failed.length > 0) {
                store.add({
                    passed      : true,
                    description : 'Failed assertions for: ' + t.get('title'),
                    type        : 'Siesta.Result.Diagnostic'
                });
                store.add(failed);
            }
        });

        return store;
    },
    
    runFailed : function () {
        var descriptors     = []
    
        this.flatStore.each(function (testFileRecord) {
        
            var test    = testFileRecord.get('test');
        
            if (test && test.isFailed()) {
                descriptors.push(testFileRecord.get('descriptor'));
            }
        })
    
        this.harness.launch(descriptors)
    },


    runAll : function () {
        var descriptors = []
        
        this.flatStore.each(function (testFile) { 
            if (testFile.isLeaf()) descriptors.push(testFile.get('descriptor')) 
        })
        
        this.harness.launch(descriptors)
    },

    stopSuite : function (button) {
        this.performStop();
        button.disable()
    
        setTimeout(function () {
        
            button.enable()
        
        }, 1000)
    },

    performStop : function() {
        this.harness.needToStop = true;
    
        this.flatStore.each(function (testFileRecord) {
            if (testFileRecord.get('isStarting') && !testFileRecord.get('isStarted')) {
                testFileRecord.set('isStarting', false);
            }
        });
    },

    // looks less nice than setting it only after preload for some reason
    onBeforeScopePreload : function (scopeProvider, url) {
        var testRecord          = this.flatStore.getById(url);
    
        testRecord.set('isStarted', true);
    },

    hideSuiteButtons : function() {
        Ext.each(this.suiteBar.query('[group=suitebtn]'), function(btn) { btn.hide(); });
    },

    showSuiteButtons : function() {
        Ext.each(this.suiteBar.query('[group=suitebtn]'), function(btn) { btn.show(); });
    },

    isTestRunningVisible : function (test) {
        // return false for test's running in popups (not iframes), since we can't show any visual accompaniment for them
        if (!(test.scopeProvider instanceof Scope.Provider.IFrame)) return false;
    
        // if there is a "forced to be on top" test then we only need to compare the tests instances
        if (this.harness.testOfForcedIFrame) {
            return this.harness.testOfForcedIFrame == test;
        }
    
        // otherwise the only possibly visible test is the one of the current assertion grid
        var resultPanel = this.getResultList();
    
        // if resultPanel has no testRecord it hasn't yet been assigned a test record
        if (!resultPanel || !resultPanel.testRecord || resultPanel.testRecord.get('test') != test) {
            return false;
        }
    
        // now we know that visible assertion grid is from our test and there is no "forced on top" test
        // we only need to check visibility (collapsed / expanded of the right panel 
        return resultPanel.isFrameVisible()
    },


    onTestStart : function (test) {
        var testRecord          = this.flatStore.getById(test.url)
        
        testRecord.isCleared    = false
       
        testRecord.beginEdit()
    
        // will trigger an update in grid
        testRecord.set({
            test        : test,
            isRunning   : true
        })
        
        testRecord.endEdit()
        
        testRecord.parentNode && testRecord.parentNode.updateFolderStatus()
        
        this.setTitle(testRecord.get('title') || url);

        this.getResultList().showTest(testRecord);
    },


    onTestUpdate : function (test, result) {
        var testRecord  = this.flatStore.getById(test.url),
            failCount = test.getFailCount(),
            passCount = test.getPassCount(),
            diffPass = passCount - testRecord.get('passCount'),
            diffFail = failCount - testRecord.get('failCount');
        
        var assertionStore = testRecord.get('assertionsStore');
    
        testRecord.beginEdit()

        testRecord.set({
            'passCount' : passCount,
            'failCount' : failCount,
            'todoPassCount' : test.getTodoPassCount(),
            'todoFailCount' : test.getTodoFailCount()
        });
    
        testRecord.endEdit()
        
        var data = {
            index               : result.index,
            passed              : result.passed,
            completed           : result.completed,
            isWaitFor           : result.isWaitFor,
            isTodo              : result.isTodo,
            description         : result.description || '&nbsp;',
            annotation          : result.annotation,
            type                : result.meta.name,

            // For logging simulated events
            isSimulatedEvent    : result.isSimulatedEvent,
            eventType           : result.type
        };
        
        if (typeof result.index === 'number' && assertionStore.getById(result.index)) {
            assertionStore.getById(result.index).set(data);
            if (result.completed) {
                this.summaryButton.updateSummary(diffPass, diffFail);
            }
        } else {
            assertionStore.add(data)
            this.summaryButton.updateSummary(diffPass, diffFail);
        }
    
        
        testRecord.parentNode && testRecord.parentNode.updateFolderStatus()
    },



    onTestEnd : function (test) {
        var testRecord          = this.flatStore.getById(test.url)
        
        // changing the time field to trigger the refresh of the test row, which will
        // also update the icon
        testRecord.set('time', test.getDuration() + 'ms')
    
        testRecord.get('assertionsStore').add({
            passed          : true,
            summaryFailure  : test.isFailed(), 
            description     : test.getSummaryMessage('<br>'),
            type            : 'Siesta.Result.Summary'
        })
        
        testRecord.parentNode && testRecord.parentNode.updateFolderStatus()
    },


    onTestFail : function (test, exception, stack) {
        var testRecord  = this.flatStore.getById(test.url)
    
        testRecord.set('isFailed', true)
    
        // if the test failed already after its finish (some exception in the `setTimeout` for example)
        // need to add additional message to user
        // however, if the exception happened when test is still running, it will be included in the `getSummaryMessage`
        if (test.isFinished()) {
            testRecord.get('assertionsStore').add({
                passed      : true,
                description : 'Test suite threw an exception: ' + exception + (stack ? '<br>' + stack.join('<br>') : ''),
                type        : 'Siesta.Result.Diagnostic'
            });
        }
        
        testRecord.parentNode && testRecord.parentNode.updateFolderStatus()
    },
    
    
    onItemDoubleTap : function (list, index, target, testModel) {
        this.launchTest(testModel);
    },
    
    
    onItemDisclose : function (list, testModel, target, index) {
        if (testModel.isCleared) this.launchTest(testModel);
        
        this.showResultPanel(testModel);
    },

    
    showResultPanel : function (testModel) {
        var resultList      = this.getResultList()
        
        if (testModel) resultList.showTest(testModel);
        
        this.suiteBar.down("button[ui='back']").enable()
        
        this.getLayout().getAnimation().setReverse(false)
        
        this.setActiveItem(resultList);
    },

    
    getResultList : function() {
        return this.resultList;
    },

    
    getFilesTree : function() {
        return this.down('testlist');
    },

    
    launchTest : function (testFile) {
        var descriptor      = testFile.get('descriptor')
        
        this.resetDescriptors([ descriptor ])
        
        this.summaryButton.resetSummary();
        
        this.harness.launch([ descriptor ])
    },

    
    rerunTest : function () {
        this.launchTest(this.getResultList().testRecord);
    }
})
//eof Siesta.Harness.Browser.UI_Mobile.MainPanel
