Ext.define('SpringTrader.LocalStore', {
    constructor: function(config) {
        this.store = (config && config.store) || window.localStorage || {};
    },

    add: function(key, value) {
        this.store[key] = value.toString();
        return this;
    },

    remove: function(key) {
        var removed = this.store[key];
        delete this.store[key];
        return removed;
    },

    find: function(key) {
        return this.store[key];
    },
});