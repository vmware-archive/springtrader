// load('nanotrader/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("nanotrader/nanotrader.html","nanotrader/out")
});
