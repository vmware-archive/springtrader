AccountSummaryView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('account-summary'));
			},
			render : function(eventName) {
				var ac = new AccountSummary();
				var type = ac.toJSON();
				$(this.el).html(this.template(ac.toJSON()));
				return this;
			}
		});
UserStatisticsView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('user-statistics'));
			},
			render : function(eventName) {
				var us = new UserStatistics();
				$(this.el).html(this.template(us.toJSON()));
				return this;
			}
		});
RecentTransactionsView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('recent-transactions'));
			},
			render : function(eventName) {
				$(this.el).html(this.template());
				return this;
			}
		});
PortfolioView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('portfolio'));
			},
			render : function(eventName) {
				$(this.el).html(this.template());
				return this;
			}
		});

PositionsView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('positions'));
			},
			render : function(eventName) {
				$(this.el).html(this.template());
				return this;
			}
		});
HomeView = Backbone.View.extend({
			tagName : 'div',
			initialize : function() {
				this.template = _.template(tpl.get('home'));
			},

			render : function(eventName) {

				$(this.el).html(this.template());
				$('#account-summary', this.el).append(new AccountSummaryView()
						.render().el);
				$('#user-statistics', this.el).append(new UserStatisticsView()
						.render().el);
				$('#recent-transactions', this.el)
						.append(new RecentTransactionsView().render().el)
				$('#portfolio', this.el)
						.append(new PortfolioView().render().el);
				$('#positions', this.el)
						.append(new PositionsView().render().el);
				return this;
			}
		});