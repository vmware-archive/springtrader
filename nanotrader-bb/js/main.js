var AppRouter = Backbone.Router.extend({

			routes : {
				"" : "home"
			},
			home : function() {
				this.homeView = new HomeView();
				this.homeView.render();

				$('#container').html(this.homeView.el);
			}
		});
tpl.loadTemplates(['home', 'account-summary', 'user-statistics',
				'recent-transactions', 'portfolio', 'positions'], function() {
			app = new AppRouter();
			Backbone.history.start();
		});