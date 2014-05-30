(function($) {
  $(document).ready(function() {
    var prev_flag = false;
    var $prev = $('#preview-container').hide();
    var $md = $('#markdown-container');

    $('#preview-button').click(function(e) {
      var $bt = $(this);

      if(! prev_flag) {
        $bt.html('EDIT');

        $prev.html(markdown.toHTML($md.find('textarea').val()));

        $md.fadeOut(600, function() {
          $prev.fadeIn(600);
        });

        prev_flag = true;
      } else {
        $bt.html('PREVIEW');
        
        $prev.fadeOut(600, function() {
          $md.fadeIn(600);
        });

        prev_flag = false;
      }

      e.stopPropagation();
      e.preventDefault();
    });

    $('#markdown-container textarea').keydown(function(e) {
      if(e.keyCode === 9) {
        // Deal with TAB
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);
        var value = $this.val();

        $this.val(value.substring(0, start)
          + '    '
          + value.substring(end));

        this.selectionStart = this.selectionEnd = start + 4;
        e.preventDefault();
      }
      e.stopPropagation();
    });
  });
})(jQuery);
