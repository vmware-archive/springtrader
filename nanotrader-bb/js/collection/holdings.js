var Holding = Backbone.Model.extend({});
var Holdings = Backbone.Collection.extend({
			model : Holding,
			url : 'data/holdings.json',
			initialize : function() {
				var coll = this;
				$.ajax({
							type : "GET",
							url : 'data/holdings.json',
							dataType : 'json',
							// Make synchronous ajax call
							async : false,
							// Since GET request is cached, make the cache to
							// false
							cache : false,
							success : function(response) {
								coll.add(response.results)
							},
							error : function(xhr, textStatus, errorThrown) {
								alert('Error' + xhr.status + " " + errorThrown);
							}
						});
			}
		});