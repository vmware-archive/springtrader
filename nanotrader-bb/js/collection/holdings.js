Holding = Backbone.Model.extend({
			initialize : function() {
				this.idAttribute = 'accountAccountid';
			}
		});

Holdings = Backbone.Collection.extend({
			model : Holding,
			parse : function(response) {
				_.each(response, function(model) {
							this.add(model);
						}, this);
			}
		});