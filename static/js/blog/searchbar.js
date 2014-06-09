(function($) {
  'use strict';

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

    // render search
    $sinput.keypress(function(e) {
      // Enter key
      if(e.which === 13) {
        e.preventDefault();
        
        // encode url
        var url = encodeURI('/blog/search/' + $sinput.val());

        // render search
        window.location.href = url;
      }

      // Other key, do nothing
    });
  });

})(jQuery);
