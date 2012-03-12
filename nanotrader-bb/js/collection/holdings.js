Holding = Backbone.Model.extend({
			initialize : function() {
				this.idAttribute = 'accountAccountid';
			}
		});

Holdings = Backbone.Collection.extend({
			model : Holding
		});