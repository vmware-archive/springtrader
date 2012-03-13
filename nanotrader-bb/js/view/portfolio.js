PortfolioSummaryView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(account_id) {
				this.template = _.template(tpl.get('portfolio-summary'));
				this.model = new PortfolioSummary({});
				this.model.url = 'spring-nanotrader-services/api/' + account_id
						+ '/portfolioSummary';
				this.model.bind('change', this.render, this);
				this.model.fetch();
			},
			render : function() {
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		});

HoldingView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(holding) {
				this.template = _.template(tpl.get('holding'));
				this.model = holding;
			},
			render : function() {
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		});
HoldingListView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(account_id) {
				this.template = _.template(tpl.get('holdinglist'));
				this.holdings = new Holdings();
				this.holdings.url = 'spring-nanotrader-services/api/'
						+ account_id + '/holding';
				this.holdings.bind('add', this.render, this);
				this.holdings.fetch();
			},
			render : function() {
				$(this.el).html(this.template());
				_.each(this.holdings.models, function(holding) {
							var hview = new HoldingView(holding);
							var quote = holding.attributes.quote;
							$('#holdings', this.el).append(hview.render().el);
						}, this);
				return this;
			}
		});

PortfolioView = Backbone.View.extend({
			tagName : 'div',
			initialize : function(account_id) {
				this.template = _.template(tpl.get('portfolio'));
				$(this.el).html(this.template());
				$('#portfolio-summary', this.el)
						.append(new PortfolioSummaryView(account_id).el);
				$('#holding-list', this.el)
						.append(new HoldingListView(account_id).el);
			}
		});