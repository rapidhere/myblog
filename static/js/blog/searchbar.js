(function($) {
  $(document).ready(function() {
    var $sinput = $('#searchbar-container input');
    var show = false;
    
    $sinput.hide();

    $('a#search-mark').click(function() {
      if(! show) {
        $sinput.fadeIn(1000, function() {
          show = true;
        });
      } else {
        $sinput.fadeOut(1000, function() {
          show = false;
        });
      }
    });
  });
})(jQuery);
