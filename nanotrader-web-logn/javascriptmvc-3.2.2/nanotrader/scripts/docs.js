//js nanotrader/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('nanotrader/nanotrader.html', {
		markdown : ['nanotrader']
	});
});