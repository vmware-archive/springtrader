AccountSummaryView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(account_id) {
				this.template = _.template(tpl.get('account-summary'));
				this.model = new AccountSummary({
							id : account_id
						});
				this.model.bind('change', this.render, this);
				this.model.fetch();
			},
			render : function() {
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		});
UserStatisticsView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(account_id) {
				this.template = _.template(tpl.get('user-statistics'));
				this.model = new UserStatistics({
							id : account_id
						});
				this.model.bind('change', this.render, this);
				this.model.fetch();
			},
			render : function() {
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		});
RecentTransactionsView = Backbone.View.extend({
			tagName : 'div',
			initialize : function() {
				this.template = _.template(tpl.get('recent-transactions'));
			},
			render : function(eventName) {
				$(this.el).html(this.template());
				return this;
			}
		});
PortfolioChartView = Backbone.View.extend({
			tagName : 'div',
			initialize : function() {
				this.template = _.template(tpl.get('portfolio-chart'));
			},
			render : function(eventName) {
				$(this.el).html(this.template());
				return this;
			}
		});
PositionsView = Backbone.View.extend({
			tagName : 'div',
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
			initialize : function(account_id) {
				this.template = _.template(tpl.get('home'));
				$(this.el).html(this.template());
				$('#account-summary', this.el)
						.append(new AccountSummaryView(account_id).el);
				$('#user-statistics', this.el)
						.append(new UserStatisticsView(account_id).el);
				$('#recent-transactions', this.el)
						.append(new RecentTransactionsView().render().el);
				$('#portfolio-chart', this.el).append(new PortfolioChartView()
						.render().el);
				$('#positions', this.el)
						.append(new PositionsView().render().el);
			}
		});