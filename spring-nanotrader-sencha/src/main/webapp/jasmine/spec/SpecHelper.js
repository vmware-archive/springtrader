beforeEach(function() {
    jasmine.Ajax.useMock();
});

afterEach(function() {
    clearAjaxRequests();
    // To set the cache to empty so that model is not cached for subsequent tests
    Ext.data.Model.cache = [];
});

var domEl;
beforeEach(function() {
    $("#jasmine_content").replaceWith('<div id="jasmine_content"></div>');
    domEl = $("#jasmine_content");
});

afterEach(function() {
    domEl.hide();
});