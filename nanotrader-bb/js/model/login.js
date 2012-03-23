Login = Backbone.Model.extend( { 
  urlRoot : 'spring-nanotrader-services/api/login',
  initialize: function() {
      var model = this;
      this.load();
  },

  authenticated: function() {
      Boolean(this.get("API_TOKEN"))
  },
  
  load : function() {
      if ($.cookie('API_TOKEN')) { 
        this.set({API_TOKEN: $.cookie('API_TOKEN')});
        this.set({accountid: $.cookie('accountid')});
      }
  }
})