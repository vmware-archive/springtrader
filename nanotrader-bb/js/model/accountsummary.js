AccountSummary = Backbone.Model.extend({
			defaults : {
				'summary_head' : 'Account Summary',
				"current_balance" : 100,
				"opening_balance" : 50,
				"cash_balance" : 20,
				"total_holdings" : 10,
				"number_of_holdings" : 5,
				"current_gain_or_loss" : 50
			}
		});
		
