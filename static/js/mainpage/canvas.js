(function($) {
  var mouse_down_flag = false;
  var lastx = undefined, lasty = undefined;
  var cc;

  var pos2CanvasPos = function(canvas, x, y) {
    var bbox =canvas.getBoundingClientRect();

    return {
      'x': (x - bbox.left) * (canvas.width / bbox.width),
      'y': (y - bbox.top)  * (canvas.height / bbox.height)
    };
  };

  $(document).ready(function() {
    // create context
    cc = $('#canvas')[0].getContext('2d');
  });

  $(document).ready(function() {
    // Config up terminal
    $('#Term').runTerm('canvas-term');

    var surf = $.createSurface('canvas-term', 'cli');
    surf.setParser(function(cli, buff) {
      var args = [];
      buff.split(' ').forEach(function(item) {
        if(item) {
          args = args.concat(item);
        }
      });

      if(args[0] === 'clear') {
        cli.moveTo(0, 0);
        cli.clear();
      } else {
        cli.putError('Unknown cmd `' + args[0] + '`\n');
      }
    });

    surf.setGreeting('Canvas Control Terminal, Powered by jquery plugin `jTerm`(https://github.com/rapidhere/jTerm)\n');
    surf.setPrompt('canvas> ')
    surf.initCLI();
  });

  $(document).ready(function() {
    // Mouse events
    $('#canvas').mousedown(function(e) {
      mouse_down_flag = true;

      var p = pos2CanvasPos($('#canvas')[0], e.pageX, e.pageY);
      lastx = p.x;
      lasty = p.y;

      cc.moveTo(p.x, p.y);

      e.stopPropagation();
      e.preventDefault();
    });

    $('body').mouseup(function(e) {
      mouse_down_flag = false;
      e.stopPropagation();
    });

    $('#canvas').mousemove(function(e) {
      if(mouse_down_flag) {

        var p = pos2CanvasPos($('#canvas')[0], e.pageX, e.pageY);

        cc.fillStyle = 'none';
        cc.strokeStyle = 'black';
        cc.lineWidth = 1;

        cc.lineTo(p.x, p.y);
        cc.stroke();

        last_mouse_posx = p.x;
        last_mouse_posy = p.y;
      }

      e.stopPropagation();
    });
  });
})(jQuery);
