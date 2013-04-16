beforeEach(function() {
    jasmine.Ajax.useMock();
});

var domEl;
beforeEach(function() {
    $("#jasmine_content").replaceWith('<div id="jasmine_content"></div>');
    domEl = $("#jasmine_content");
});

afterEach(function() {
    domEl.hide();
});