/*

Siesta 1.1.8
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
Ext.define('Siesta.Harness.Browser.UI.Viewport', {

    extend          : 'Ext.container.Viewport',


    title           : null,

    harness         : null,

    // need to set stateful properties before `initComponent`
    stateful        : false,

    // stateful
    selection       : null,
    selectedURL     : null,
    filter          : null,
    filterGroups    : false,
    // eof stateful

    testsStore      : null,

    contextMenu     : null,

    verticalCenteredTpl     : new Ext.XTemplate(
        '<div class="tr-vertical-align-helper-content {cls}">{text}</div>',
        '<div class="tr-vertical-align-helper"></div>',
        { 
            compiled : true 
        }
    ),

//    statusIndicatorEl   : null,
    
    header          : null,
    headerClass     : 'Siesta.Harness.Browser.UI.Header',
    
    collapsedNodes  : null,


    initComponent : function () {
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider())

        this.selection      = {}
    
        this.applyState(this.loadState())
    
    
        var testsStore      = this.testsStore = new Siesta.Harness.Browser.Model.TestTreeStore({
            model           : 'Siesta.Harness.Browser.Model.TestFile',
        
            sortOnLoad      : false,
        
            root            : { expanded : true, loaded : true },
        
            proxy           : {
                type        : 'memory',
            
                data        : this.buildTreeData({
                    id          : 'root',
                    group       : 'test suite' + this.title,
                    items       : this.harness.descriptors
                }).children,
            
                reader      : {
                    type    : 'json'
                }
            },
            
            listeners       : {
                collapse    : this.saveState,
                expand      : this.saveState,
                
                scope       : this
            }
        })
    
        testsStore.load()
        
        var header  = this.header = Ext.create(this.headerClass, {
            viewport        : this,
            stateConfig     : this.getState()
        });       
        
        header.on({
            optionchange            : this.onOptionChange,
            beforesettingsmenushow  : this.onSettingsMenuBeforeShow,
            buttonclick             : this.onHeaderButtonClick,
            logoclick               : this.onLogoClick,
            
            scope                   : this
        });
        
        
        Ext.apply(this, {
            plugins         : Ext.isIE ? undefined : new Siesta.Harness.Browser.UI.MouseVisualizer(this.harness),
            slots           : true,
            
            contextMenu     : this.buildContextMenu(),
        
            layout  : 'border',
            items   : [
                header,
                {
                    region      : 'west',
                        
                    xtype       : 'testgrid',
                    slot        : 'filesTree',
                    id          : this.harness.id + '-testTree',
                        
                    iconCls     : 'tr-status-neutral-small',
                        
                    animate     : !Ext.isIE,    
                    split       : true, 
                    
                    filter          : this.filter,
                    filterGroups    : this.filterGroups,
                        
                    listeners   : {
                        selectionchange     : this.onSelectionChange, 
                        checkchange         : this.onCheckChange,
                            
                        itemcontextmenu     : this.onFilesContextMenu,
                        itemdblclick        : this.onTestFileDoubleClick,
                        
                        'filter-group-change'   : this.saveState,
                            
                        scope                   : this,
                        resize : function() {
                            // Make sure the minWidth of the assertion grid is respected
                            this.slots.resultPanel.ensureLayout();
                        }
                    },
                        
                    store       : testsStore
                },
                {
                    xtype       : 'resultpanel',
                    region      : 'center',
                    slot        : 'resultPanel',
                    cls         : 'resultPanel-panel tr-main-area-centered',
                    viewDOM     : this.getOption('viewDOM'),
                    id          : this.harness.id + '-resultpanel',
                    
                    maintainViewportSize    : this.harness.maintainViewportSize,

                    listeners       : {
                        viewdomchange : function(g, value) {
                            this.setOption('viewDOM', value);
                            this.saveState();
                        },
                
                        rerun         : this.rerunTest,

                        scope : this
                    }
//                  items       : [{ xtype : 'centerpanel', slot : 'splashpanel' }]

                }
                // eof main content area
            ]
        })
    
        this.callParent()
        
        // for some reason doesn't work, when specified as the "listeners" config in the "viewConfig" option above
        this.slots.filesTree.getView().on('viewready', this.onViewReady, this, { single : true })
    
        // delay is required to avoid recursive loop
        this.on('afterlayout', this.onAfterLayout, this, { single : true, delay : 1 })
        
        this.slots.filesTree.store.on({
            'filter-set'        : this.saveState,
            'filter-clear'      : this.saveState,
            
            scope               : this
        })
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
                expanded        : (collapsedNodes[ prevId ] != null || descriptor.expanded === false) ? false : true,
                // || false is required for TreeView - it checks that "checked" field contains Boolean
                checked         : me.selection.hasOwnProperty(prevId) || false,
            
                folderStatus    : 'yellow',
            
                children        : children,
                leaf            : false
            })
        
        } else {
            Ext.apply(data, {
                url             : descriptor.url,
            
                leaf            : true,
                // || false is required for TreeView - it checks that "checked" field contains Boolean
                checked         : me.selection.hasOwnProperty(prevId) || false,
            
                passCount       : 0,
                failCount       : 0,
            
                time            : 0,
            
                assertionsStore : new Ext.data.Store({
                    //autoDestroy : true,
                    model       : 'Siesta.Harness.Browser.Model.Assertion',

                    // Prevent datachanged event from being fired by an eventStore add action
                    insert : function() {
                        var O = Ext.util.Observable;
                        O.capture(this, function(name) {
                            return name !== 'datachanged';
                        });
                        var result = this.self.prototype.insert.apply(this, arguments);
                        O.releaseCapture(this);
                        return result;
                    }
                })
            })
        }
    
        return data
    },


    onAfterLayout : function () {
//        this.statusIndicatorEl  = this.slots.title.el.down('.tr-status-indicator')
    
        if (this.getOption('autoRun')) {
            var checked     = this.getChecked()
        
            // either launch the suite for checked tests or for all
            this.harness.launch(checked.length && checked || this.harness.descriptors)
        }
    },


    onViewReady : function () {
        if (this.selectedURL) {
            var testFile    = this.testsStore.getNodeById(this.selectedURL)
        
            if (testFile) this.slots.filesTree.getSelectionModel().select(testFile)
        }
    },


    onSelectionChange : function (selModel, selectedRecords) {
    
        if (selectedRecords.length) {
            var testFile        = selectedRecords[ 0 ]
        
            if (testFile.get('test')) this.activateAssertionsGridFor(testFile)
        
            this.selectedURL = testFile.getId()
        
            this.saveState()
        }
    },


    onCheckChange : function (testFile, checked) {
        this.setNodeChecked(testFile, checked)
    },


    setNodeChecked : function (testFile, checked, doNotCascade, skipSave) {
        var me      = this
        var id      = testFile.getId()
    
        if (checked)
            this.selection[ id ] = 1
        else
            delete this.selection[ id ]

        
        testFile.set('checked', checked)
        
        // when unchecking the node - uncheck the parent node (folder) as well 
        if (!checked && testFile.parentNode) me.setNodeChecked(testFile.parentNode, false, true, true)
    
        // only cascade for folders and when `doNotCascade` is false
        if (!testFile.isLeaf() && !doNotCascade) Ext.each(testFile.childNodes, function (childNode) {
            me.setNodeChecked(childNode, checked, false, true)
        })
    
        if (!skipSave) this.saveState()
    },


    onTestSuiteStart : function (descriptors) {
        var harness             = this.harness
        var filesTree           = this.slots.filesTree
        var selModel            = filesTree.getSelectionModel()
        var prevSelection       = selModel.getLastSelected()
        var testsStore          = this.testsStore
    
        this.resetDescriptors(descriptors);
    
        // restore the selection after data reload
        if (prevSelection) selModel.select(testsStore.getNodeById(prevSelection.getId()))
        
        var updated             = {}
    
        Joose.A.each(harness.flattenDescriptors(descriptors), function (descriptor) {
            var testRecord  = testsStore.getNodeById(descriptor.id)
        
            testRecord.set({
                isMissing   : descriptor.isMissing,
                isStarting  : true
            })
            
            var groupNode   = testRecord.parentNode
            
            if (groupNode && !updated[ groupNode.getId() ]) {
                // trying hard to prevent extra updates
                for (var node = groupNode; node; node = node.parentNode) updated[ node.getId() ] = true
                
                groupNode.updateFolderStatus()
            }
        })
    
        Ext.suspendLayouts();
        
        filesTree.setIconCls('tr-status-running-small')
        filesTree.setTitle('Running...')
        
        Ext.resumeLayouts();
    },


    resetDescriptors : function(descriptors) {
        var testsStore          = this.testsStore;

        Joose.A.each(this.harness.flattenDescriptors(descriptors), function(descriptor){
            var testRecord = testsStore.getNodeById(descriptor.id);
        
            testRecord.get('assertionsStore').removeAll(true)
            testRecord.reject();
            // || false is required for TreeView - it checks that "checked" field contains Boolean
            testRecord.set('checked', this.selection.hasOwnProperty(descriptor.id) || false)
        }, this);
    },

    
    onTestSuiteEnd : function (descriptors) {
        this.updateStatusIndicator()

        setTimeout(function() {
            Ext.select('.ghost-cursor-click-indicator').each(function(el) { el.destroy(); });
        }, 3000);
    },
    
    
    // returns the NodeStore of the TreeStore - flattened presentation of the tree (it's potentially filtered)
    getNodeStore : function () {
        return this.slots.filesTree.getView().store
    },
    
    
    forEachTestFile : function (func, scope) {
        var nodeStore   = this.getNodeStore()
        
        if (this.testsStore.isTreeFiltered())
            nodeStore.each(func, scope)
        else
            Ext.Array.each(this.testsStore.tree.flatten(), func, scope)
    },


    getChecked : function () {
        var descriptors     = []
    
        this.forEachTestFile(function (testFileRecord) {
        
            if (testFileRecord.get('checked') && testFileRecord.isLeaf()) descriptors.push(testFileRecord.get('descriptor'))
        })
    
        return descriptors
    },

    runChecked : function () {
        this.harness.launch(this.getChecked())
    },


    runFailed : function () {
        var descriptors     = []
    
        this.forEachTestFile(function (testFileRecord) {
        
            var test    = testFileRecord.get('test')
        
            if (test && test.isFailed()) descriptors.push(testFileRecord.get('descriptor'))
        })
    
        this.harness.launch(descriptors)
    },


    runAll : function () {
        var allDesc     = []
        
        this.forEachTestFile(function (testFile) {
            if (testFile.isLeaf()) allDesc.push(testFile.get('descriptor')) 
        })
        
        this.harness.launch(allDesc)
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
    
        Ext.each(this.testsStore.tree.flatten(), function (testFileRecord) {
            if (testFileRecord.get('isStarting') && !testFileRecord.get('isStarted')) {
                testFileRecord.set('isStarting', false);
            }
        });
    },


    activateAssertionsGridFor : function (testFile, canManageDOM) {
        var resultPanel         = this.slots.resultPanel;
    
        resultPanel.showTest(testFile);
    
        resultPanel.setViewDOM(this.getOption('viewDOM'), true);
        
        if (canManageDOM != undefined) resultPanel.setCanManageDOM(canManageDOM)
        
        // REMOVE_AFTER_SPLASH 
        resultPanel.el.removeCls('tr-main-area-centered')
        // REMOVE_AFTER_SPLASH 
        
        if (resultPanel.isFrameVisible()) testFile.get('test').fireEvent('testframeshow')
    },


    // looks less nice than setting it only after preload for some reason
    onBeforeScopePreload : function (scopeProvider, url) {
        var testRecord          = this.testsStore.getNodeById(url)
    
        // to avoid disturbing grid
        testRecord.data.isStarted = true
    },


    isTestRunningVisible : function (test) {
        // return false for test's running in popups (not iframes), since we can't show any visual accompaniment for them
        if (!(test.scopeProvider instanceof Scope.Provider.IFrame)) return false;
    
        // if there is a "forced to be on top" test then we only need to compare the tests instances
        if (this.harness.testOfForcedIFrame) {
            return this.harness.testOfForcedIFrame == test;
        }
    
        // otherwise the only possibly visible test is the one of the current assertion grid
        var resultPanel = this.slots.resultPanel;
    
        // if resultPanel has no testRecord it hasn't yet been assigned a test record
        if (!resultPanel.testRecord || resultPanel.testRecord.get('test') != test) {
            return false;
        }
    
        // now we know that visible assertion grid is from our test and there is no "forced on top" test
        // we only need to check visibility (collapsed / expanded of the right panel 
        return resultPanel.isFrameVisible()
    },


    onTestStart : function (test) {
        var testRecord          = this.testsStore.getNodeById(test.url)
        var testDescriptor      = this.harness.getScriptDescriptor(test.url)
        
        var resultPanel         = this.slots.resultPanel
        
        if (resultPanel.testRecord === testRecord) {
            resultPanel.clear();
        }

        testRecord.beginEdit()
    
        // will trigger an update in grid
        testRecord.set({
            test        : test,
            isRunning   : true
        })
        
        testRecord.endEdit()
        
        var currentSelection    = this.slots.filesTree.getSelectionModel().getLastSelected()
    
        resultPanel.hideIFrame();

        // activate the assertions grid for currently selected row, or, if the main area is empty
        if (currentSelection && currentSelection.getId() == test.url) {
            // when starting the test with forcedIframe - do not allow the assertion grid to change the location of the iframe
            // (canManageDOM is set to false)
            this.activateAssertionsGridFor(testRecord, !this.harness.testHasForcedIframe(test))
        }
    },


    onTestUpdate : function (test, result) {

        var testRecord      = this.testsStore.getNodeById(test.url),
            failCount       = test.getFailCount();
            
        var assertionStore  = testRecord.get('assertionsStore');

        var data            = {
            index               : result.index,
            passed              : result.passed,
            
            isTodo              : result.isTodo,
            isWaitFor           : result.isWaitFor,
            completed           : result.completed,
            
            description         : result.description || '&nbsp;',
            annotation          : result.annotation,
            
            type                : result.meta.name,
            sourceLine          : result.sourceLine,
            
            isWarning           : result.isWarning,

            // For logging simulated events
            isSimulatedEvent    : result.isSimulatedEvent,
            eventType           : result.type
        };
        
        var alreadyHaveIndex    = assertionStore.findBy(function (assertion) {
            return assertion.__result__ == result
        })
        
        if (alreadyHaveIndex != -1) {
            assertionStore.getAt(alreadyHaveIndex).set(data)
        } else {
            var newAssertion    = assertionStore.add(data);
            
            newAssertion[ 0 ].__result__ = result
        }
        
        if (failCount > 0 && this.getOption('breakOnFail')) {
            this.performStop();
            this.slots.filesTree.getSelectionModel().select(testRecord);
        }
    },



    onTestEnd : function (test) {
        var testRecord          = this.testsStore.getNodeById(test.url)
        var testDescriptor      = this.harness.getScriptDescriptor(test.url)
        
        testRecord.beginEdit()

        testRecord.set({
            'passCount'         : test.getPassCount(),
            'failCount'         : test.getFailCount(),
            'todoPassCount'     : test.getTodoPassCount(),
            'todoFailCount'     : test.getTodoFailCount(),
            'time'              : test.getDuration() + 'ms'
        });
  
        testRecord.endEdit()
    
        testRecord.get('assertionsStore').add({
            passed          : true,
            summaryFailure  : test.isFailed(), 
            description     : test.getSummaryMessage('<br>'),
            type            : 'Siesta.Result.Summary'
        })
    
        testRecord.parentNode && testRecord.parentNode.updateFolderStatus()
    
        if (this.harness.testHasForcedIframe(test)) {
            var resultPanel = this.slots.resultPanel;
        
            resultPanel.setCanManageDOM(true)
        }
    },


    onTestFail : function (test, exception, stack) {
        var testRecord  = this.testsStore.getNodeById(test.url)
    
        testRecord.set('isFailed', true)
    
        testRecord.parentNode && testRecord.parentNode.updateFolderStatus()
    
        // if the test failed already after its finish (some exception in the `setTimeout` for example)
        // need to add additional message to user
        // however, if the exception happened when test is still running, it will be included in the `getSummaryMessage`
        if (test.isFinished()) testRecord.get('assertionsStore').add({
            passed      : true,
            description : 'Test suite threw an exception: ' + exception + (stack ? '<br>' + stack.join('<br>') : ''),
            type        : 'Siesta.Result.Diagnostic'
        })
    },
    
    
    getOption : function (name) {
        switch (name) {
            case 'selection'    : return this.selection
            
            case 'selectedURL'  : return this.selectedURL
            
            default             : return this.harness[ name ]
        }
    },
    
    
    setOption : function (name, value) {
        switch (name) {
            case 'selection'    : return this.selection         = value
            
            case 'selectedURL'  : return this.selectedURL       = value
            
            case 'collapsedNodes': return this.collapsedNodes   = value
            
            case 'filter'       : return this.filter            = value
            case 'filterGroups' : return this.filterGroups      = value
            
            default             : return this.harness[ name ]   = value
        }
    },


    getState : function () {
        return {
            // harness configs
            autoRun         : this.getOption('autoRun'),
            speedRun        : this.getOption('speedRun'),
            viewDOM         : this.getOption('viewDOM'),
            keepResults     : this.getOption('keepResults'),
            cachePreload    : this.getOption('cachePreload'),
            transparentEx   : this.getOption('transparentEx'),
            breakOnFail     : this.getOption('breakOnFail'),
        
            // UI configs
            selectedURL     : this.selectedURL,
            
            selection       : this.getCheckedNodes(),
            collapsedNodes  : this.getCollapsedFolders(),
            
            filter          : this.slots ? this.slots.filesTree.getFilterValue() : this.filter,
            filterGroups    : this.slots ? this.slots.filesTree.getFilterGroups() : this.filterGroups
        }
    },
    
    
    getCheckedNodes : function () {
        var checked        = {}
        
        Joose.A.each(this.testsStore.tree.flatten(), function (treeNode) {
            if (treeNode.get('checked')) checked[ treeNode.getId() ] = 1
        })
        
        return checked
    },
    
    
    getCollapsedFolders : function () {
        var collapsed        = {}
        
        Joose.A.each(this.testsStore.tree.flatten(), function (treeNode) {
            if (!treeNode.isLeaf() && !treeNode.isExpanded()) collapsed[ treeNode.getId() ] = 1
        })
        
        return collapsed
    },
    
    
    applyState : function (state) {
        var me  = this
        
        if (state) Joose.O.each(state, function (value, name) {
            me.setOption(name, value)
        })
    },


    getStateId : function () {
        return 'test-run-' + this.title
    },


    onOptionChange : function (component, optionName, optionValue) {
        this.setOption(optionName, optionValue)
    
        if (optionName == 'viewDOM') {
            var resultPanel = this.slots.resultPanel;
            
            resultPanel.setViewDOM(optionValue);
        }

        this.saveState()
    },
    
    
    loadState : function () {
        var stateId     = this.getStateId()
        var state       = Ext.state.Manager.get(stateId)
        
        if (!state) return
        
        if (!state.collapsedNodes)  state.collapsedNodes    = Ext.state.Manager.get(stateId + '-collapsed')
        if (!state.selection)       state.selection         = Ext.state.Manager.get(stateId + '-selection')
        
        return state
    },


    saveState : function () {
        var stateId     = this.getStateId()
        var state       = this.getState()
        
        Ext.state.Manager.set(stateId + '-collapsed', state.collapsedNodes)
        Ext.state.Manager.set(stateId + '-selection', state.selection)
        
        delete state.collapsedNodes
        delete state.selection
        
        Ext.state.Manager.set(stateId, state)
    },


    uncheckAllExcept : function (testFile) {
        var me      = this
    
        Ext.each(this.testsStore.tree.flatten(), function (node) {
        
            if (node != testFile) me.setNodeChecked(node, false, true)
        })
    },
    
    buildContextMenu : function () {
        return new Ext.menu.Menu({
        
            renderTo    : Ext.getBody(),
        
            defaults    : {
                scope   : this
            },
        
            items       : [
                {
                    text        : 'Uncheck others (and check this)',
                
                    handler     : this.uncheckOthersHandler
                },
                {
                    text        : 'Uncheck all',
                
                    handler     : this.uncheckAllHandler
                },
                {
                    text        : 'Check all',
                
                    handler     : this.checkAllHandler
                },
                {
                    text        : 'Run this',
                
                    handler     : this.runThisFileHandler
                }
            ]
        })
    },


    uncheckOthersHandler : function () {
        var currentFile     = this.currentFile
    
        this.uncheckAllExcept(currentFile)
    
        this.setNodeChecked(currentFile, true)
    },


    runThisFileHandler : function () {
        this.harness.launch([ this.currentFile.get('descriptor') ])
    },


    uncheckAllHandler : function () {
        this.uncheckAllExcept()
    },


    checkAllHandler : function () {
        var me      = this
    
        Ext.each(this.testsStore.tree.flatten(), function (node) {
        
            me.setNodeChecked(node, true, true)
        })
    },


    onFilesContextMenu : function (view, testFile, el, index, event) {
        this.currentFile    = testFile
    
        this.contextMenu.setPagePosition(event.getX(), event.getY())
    
        this.contextMenu.show()
    
        event.preventDefault()
    },


    onTestFileDoubleClick : function (view, testFile) {
        if (this.testsStore.isTreeFiltered() && !testFile.isLeaf()) {
            var childDesc       = []
            var nodeStore       = this.testsStore.nodeStore
            
            for (var i = nodeStore.indexOf(testFile) + 1; i < nodeStore.getCount(); i++) {
                var currentNode     = nodeStore.getAt(i)
                
                if (!currentNode.isAncestor(testFile)) break 
                
                if (currentNode.isLeaf()) childDesc.push(currentNode.get('descriptor'))
            }
            
            this.harness.launch(childDesc);
        } else 
            this.launchTest(testFile);
    },

    
    launchTest : function (testFile) {
        if (testFile.data.leaf) {
            // clear the content of the result panel, but keep the assertions of the current test,
            // since we could be launching some other test
            // assertions of the tests being launched will be cleared in the `onTestSuiteStart` method
            this.slots.resultPanel.clear(true);
        }
        
        this.harness.launch([ testFile.get('descriptor') ])
    },

    updateStatusIndicator : function () {
        // can remain neutral if all files are missing for example
        var isNeutral       = true
        var allGreen        = true
        var hasFailures     = false
    
        var totalPassed     = 0
        var totalFailed     = 0
    
        Ext.each(this.testsStore.tree.flatten(), function (testFileRecord) {
            var test        = testFileRecord.get('test')
        
            // if there's at least one test - state is not neutral
            if (test && test.isFinished()) {
                isNeutral = false
            
                allGreen        = allGreen      && test.isPassed()
                hasFailures     = hasFailures   || test.isFailed()
            
                totalPassed     += test.getPassCount()
                totalFailed     += test.getFailCount()
            }
        })
    
//        var statusIndicatorEl   = this.statusIndicatorEl
    
//        statusIndicatorEl.removeCls([ 'tr-status-running', 'tr-status-allgreen', 'tr-status-bugs' ])
    
        Ext.suspendLayouts();
        
        var filesTree       = this.slots.filesTree
    
        filesTree.setTitle('Totals: ' + totalPassed + ' / ' + totalFailed)
    
//        if (isNeutral) return
//        
//        if (allGreen)       statusIndicatorEl.addCls('tr-status-allgreen')
//        if (hasFailures)    statusIndicatorEl.addCls('tr-status-bugs')
    
        if (isNeutral)      filesTree.setIconCls('tr-status-neutral-small')
        if (allGreen)       filesTree.setIconCls('tr-status-allgreen-small')
        if (hasFailures)    filesTree.setIconCls('tr-status-bugs-small')
        
        Ext.resumeLayouts();
    },

    onSettingsMenuBeforeShow : function(hdr, menu) {
        menu.down('[option=viewDOM]').setChecked(this.getOption('viewDOM'));
    },

    onHeaderButtonClick : function(hdr, button, action) {
        switch(action) {
            case 'run-checked':
                this.runChecked();
            break;
            case 'run-failed':
                this.runFailed();
            break;
            case 'run-all':
                this.runAll();
            break;
            case 'stop':
                this.stopSuite(button);
            break;
        }
    },
    
    
    onLogoClick : function () {
        //this.slots.resultPanel. => setActiveItem(this.slots.splashpanel)
    },

    
    rerunTest : function () {
        var toRun = this.slots.resultPanel.testRecord || this.slots.filesTree.getSelectionModel().getSelection()[0];
        
        if (toRun) {
            this.launchTest(toRun);
        }
    }
})
//eof Siesta.Harness.Browser.UI.Viewport
