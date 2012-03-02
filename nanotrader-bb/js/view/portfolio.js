PortfolioSummaryView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('portfolio-summary'));
			},
			render : function(eventName) {
				var ps = new PortfolioSummary();
				$(this.el).html(this.template(ps.toJSON()));
				return this;
			}
		});

HoldingView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('holding'));
			}
		});
HoldingListView = Backbone.View.extend({
			tagName : 'div',
			initialize : function() {
				this.template = _.template(tpl.get('holdinglist'));
			},
			render : function(eventName) {
				$(this.el).html(this.template());
				var holdings = new Holdings();
				_.each(holdings.models, function(holding) {
							var holdingView = new HoldingView();
							$(holdingView.el).html(holdingView.template(holding
									.toJSON()));
							$('#holdings', this.el).append(holdingView.el);
						}, this);
				return this;
			}
		});

PortfolioView = Backbone.View.extend({
			tagName : 'div',
			initialize : function() {
				this.template = _.template(tpl.get('portfolio'));
			},

			render : function(eventName) {
				$(this.el).html(this.template());
				$('#portfolio-summary', this.el)
						.append(new PortfolioSummaryView().render().el);
				$('#holding-list', this.el).append(new HoldingListView()
						.render().el);
				return this;
			}
		});