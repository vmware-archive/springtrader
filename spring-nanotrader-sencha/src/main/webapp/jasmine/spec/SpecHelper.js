beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }
  });
});

var domEl;
beforeEach(function() {
    $("#jasmine_content").replaceWith('<div id="jasmine_content"></div>');
    domEl = $("#jasmine_content");
});
