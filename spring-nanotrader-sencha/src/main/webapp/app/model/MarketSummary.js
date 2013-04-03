/*
 * File: app/model/MarketSummary.js
 *
 */

Ext.define('SpringTrader.model.MarketSummary', {
  extend: 'Ext.data.Model',

  config: {
	       fields: [
	               {name: 'index', type: 'string'},
	               {name: 'volume', type: 'string'},
	               {name: 'change', type: 'string'}
	       ]
  }
});