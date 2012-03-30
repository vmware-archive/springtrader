steal("funcunit", function(){
	module("nanotrader test", { 
		setup: function(){
			S.open("//nanotrader/nanotrader.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})