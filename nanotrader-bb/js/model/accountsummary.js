AccountSummary = Backbone.Model.extend({
			initialize : function() {
				var model = this;
				$.ajax({
							type : "GET",
							url : 'data/accountsummary.json',
							dataType : 'json',
							//Make synchronous ajax call
							async:   false,
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
