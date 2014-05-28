(function($) {
  var nav_item = [
    ['BLOG', 'blog'],
    ['GITHUB', 'https://github.com/rapidhere'],
    ['RENREN', 'http://www.renren.com/471861890'],
  ];
  
  // Set up the navigator item
  var setItem = function(idx) {
    var name = nav_item[idx][0];
    var url = nav_item[idx][1];
    
    $('h1 #item').slideToggle(400, function() {
      $('h1 #item').html(name);
      $('h1 #enter').attr('href', url);

      $('h1 #item').slideToggle(400);
    });
  };
  
  // current item index
  var idx = 0;

  $(document).ready(function() {
    // Toggle item
    $('h1 #item').click(function() {
      idx = (idx + 1) % nav_item.length;

      setItem(idx);
    });
    
    // Show Enter mark
    $('h1').mouseenter(function() {
      $('h1 #item-container').css({
          'width': '150px',
          'height': '39px',
      });

      $('h1 #enter').fadeIn(400, function() {
        // Do this twice? -> For animate
        $('h1 #item-container').css({
          'width': '150px',
          'height': '39px',
        });
      });
    });

    // Remove Enter Mark
    $('h1').mouseleave(function() {
      $('h1 #enter').fadeOut(400, function() {
        $('h1 #item-container').css('width', 'auto');
        $('h1 #item-container').css('height', 'auto');
      });
    });

    $('h1 #enter').hide();
  });
})(jQuery);
