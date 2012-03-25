Backbone.old_sync = Backbone.sync
Backbone.sync = function(method, model, options) {
    var new_options =  _.extend({
        beforeSend: function(xhr) {
            var token = $.cookie('API_TOKEN');
            if (token !== null) xhr.setRequestHeader('API_TOKEN', token);
        }
    }, options)
    Backbone.old_sync(method, model, new_options);
};
var AppRouter = Backbone.Router.extend({
			routes : {
                "login" : "login",
				"dashboard/:id" : "home",
				"accountprofile/:id" : "accountprofile",
				"trade/:id" : "trade",
				"portfolio/:id" : "portfolio"
			},

			initialize : function() {
				this.headerView = new HeaderView();
				$('#header').html(this.headerView.render().el);
			},
			accountprofile : function(id) {
				if (!this.accountProfileView) {
					this.accountProfileView = new AccountProfileView(id);
				}
				$('#content').html(this.accountProfileView.el);
				this.tabView = new TabView({
							name : 'profile', accountid : id
						});
				this.tabView.render();
				$('#tabs').html(this.tabView.el);
			},
			login : function() {
			    
				if (!this.loginView) { 
				    this.loginView = new LoginView();
				}
				this.loginView.render();
				$('#content').html(this.loginView.el);
			},
			home : function(id) {
				this.homeView = new HomeView(id);
				$('#content').html(this.homeView.el);
				this.tabView = new TabView({
							name : 'home', accountid : id
						});
				this.tabView.render();
				$('#tabs').html(this.tabView.el);
			},
			portfolio : function(id) {
				this.PortfolioView = new PortfolioView(id);
				$('#content').html(this.PortfolioView.el);
				this.tabView = new TabView({
							name : 'portfolio', accountid : id
						});
				this.tabView.render();
				$('#tabs').html(this.tabView.el);
			},
	        trade : function(id) {
                if (!this.tradeView) {
                        this.tradeView = new TradeView(id);
                        this.tradeView.render();
                }
                $('#content').html(this.tradeView.el);
                this.tabView = new TabView({
                        name : 'trade', accountid : id
                });
                this.tabView.render();
                $('#tabs').html(this.tabView.el);
	        }
		});

this.app = null;
tpl.loadTemplates(['home', 'account-summary', 'user-statistics',
				'recent-transactions', 'positions', 'portfolio',
				'portfolio-summary', 'holdinglist', 'holding',
				'accountprofile', 'tabs', 'header', 'login', 'portfolio-chart',
				'quote-row', 'quote-list', 'quote-prompt', 'order-row',
				'order-list', 'trade'], function() {
		    this.app = new AppRouter();
            Backbone.history.start();
		});
