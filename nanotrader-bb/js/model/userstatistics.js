UserStatistics = Backbone.Model.extend({
			initialize : function() {
				var model = this;
				$.ajax({
							type : "POST",
							url : 'data/userstatistics.json',
							dataType : 'json',
							// Make synchronous ajax call
							async : false,
							cache: false,
							success : function(response) {
								model.set(response.results[0]);
							},
							error : function(xhr, textStatus, errorThrown) {
								alert('Error'+ xhr.status + " " + errorThrown);
							}
						});
			}
		});