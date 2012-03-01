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
HoldingsView = Backbone.View.extend({
			tagName : 'tr',
			initialize : function() {
				this.template = _.template(tpl.get('holdings'));
			},
			render : function(eventName) {
				var holdings = new Holdings();
				var thisView = this;
				_.each(holdings.models, function(model) {
							var test = this.el;
							$(this.el).html(this.template(model.toJSON()));
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
				$('#holdings', this.el).append(new HoldingsView().render().el);
				return this;
			}
		});