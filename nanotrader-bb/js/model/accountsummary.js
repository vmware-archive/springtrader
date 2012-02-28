AccountSummary = Backbone.Model.extend({
			initialize : function() {
				var model = this;
				var test = $.ajax({
							type : "POST",
							url : 'data/accountsummary.json',
							dataType : 'json',
							//Make synchronous ajax call
							async:   false,
							success : function(response) {
								model.set(response.results[0]);
							},
							error : function(xhr, textStatus, errorThrown) {
								alert(xhr.status);
							}
						});
			}
		});
