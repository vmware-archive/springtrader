AccountSummaryView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(account_id) {
				this.account_id = account_id;
				this.template = _.template(tpl.get('account-summary'));
				this.model = new AccountSummary({
							id : account_id,
							numberOfHolding : "",
							totalHolding : "",
							gain : ""
						});
				this.model.bind('change', this.setPortfolio, this);
				this.model.fetch();
			},
			render : function() {
				var test = this.holding.get("numberOfHoldings");
				var test1 = this.model.get("numberOfHoldings");
				var attr = this.model.attributes;
				this.model.set({
							numberOfHoldings : this.holding
									.get("numberOfHoldings"),
							totalHolding : this.holding.get("totalMarketValue"),
							gain : this.holding.get("gain")
						}, {
							silent : true
						});
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			},
			setPortfolio : function() {
				this.holding = new PortfolioSummary();
				this.holding.url = 'spring-nanotrader-services/api/'
						+ this.account_id + '/portfolioSummary';
				this.holding.bind('change', this.render, this);
				this.holding.fetch();
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