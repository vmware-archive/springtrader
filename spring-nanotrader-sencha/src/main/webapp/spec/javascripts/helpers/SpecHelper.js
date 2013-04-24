beforeEach(function () {
});

afterEach(function () {
    Ext.data.Model.cache = [];
});

var domEl;
beforeEach(function () {
    domEl = document.createElement('div');
    domEl.setAttribute('id', 'jasmine_content');
    var oldEl = document.getElementById('jasmine_content');
    oldEl.parentNode.replaceChild(domEl, oldEl);
});

afterEach(function () {
    domEl.setAttribute('style', 'display:none;');
});
