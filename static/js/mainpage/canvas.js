(function($) {
  // mouse down?
  var mouse_down_flag = false;

  // last pos of mouse
  var last_pos;

  // start pos of mouse
  var start_pos;

  // current pos
  var cur_pos;

  // Canvas Context
  var cc; 
  
  // The canvas object
  var canvas;

  // Hooks
  var hook_mouse_down;  // What to do when mouse down
  var hook_mouse_up;    // What to do when mouse up
  var hook_mouse_move;  // What to do when mouse move

  // Current tool
  var cur_tool;

  // Convert HTML Document position to Canvas Postiion
  var pos2CanvasPos = function(x, y) {
    var bbox =canvas.getBoundingClientRect();

    return {
      'x': (x - bbox.left) * (canvas.width / bbox.width),
      'y': (y - bbox.top)  * (canvas.height / bbox.height)
    };
  };

  // Init
  $(document).ready(function() {
    canvas = $('#canvas')[0];
    cc = canvas.getContext('2d');


    cc.lineWidth = 1;
    cc.fillStyle = 'black';
    cc.strokeStyle = 'black';
  });
  
  // Config up terminal
  $(document).ready(function() {
    // Start up terminal
    $('#Term').runTerm('canvas-term');
    
    // Create a surface
    var surf = $.createSurface('canvas-term', 'cli');

    // Config up CLI Surface
    surf.setGreeting('Canvas Control Terminal, Powered by jquery plugin `jTerm`(https://github.com/rapidhere/jTerm).\nEnter `help` to get help info.\n');
    surf.setPrompt('canvas> ');
    
    // Set up cmd parser
    surf.setParser(function(cli, buff) {
      var args = [];
      buff.split(' ').forEach(function(item) {
        if(item) {
          args = args.concat(item);
        }
      });

      if(args[0] === 'clear') {
        // Clear screen
        cli.moveTo(0, 0);
        cli.clear();
      } else if(args[0] === 'use') {
        // Use some tool to draw
        if(args[1] === 'pen') {
          // Normal pen
          hook_mouse_down = function() {
            cc.beginPath();
            cc.moveTo(cur_pos.x, cur_pos.y);
          };

          hook_mouse_up = function() {
            cc.closePath();
          };

          hook_mouse_move = function() {
            cc.lineTo(cur_pos.x, cur_pos.y);
            cc.stroke();
          };

          cur_tool = 'pen';
        } else {
          cli.putError('Unknown tool `' + args[1] + '`\n');
        }
      } else if(args[0] === 'fill-color') {
        cc.fillStyle = args[1];
      } else if(args[0] === 'stroke-color') {
        cc.strokeStyle = args[1];
      } else if(args[0] === 'status') {
        // Print status of canvas
        cli.putInfo(
          '# Tool: ' + cur_tool + '\n' +
          '# FillStyle: ' + cc.fillStyle + '\n' +
          '# StrokeStyle: ' + cc.strokeStyle + '\n' +
          '# Font: ' + cc.font + '\n' +
          '# LineWidth: ' + cc.lineWidth + '\n'
        );
      } else if(args[0] === 'help') {
        // Print the help info
        cli.putInfo(
          'Commands: \n' +
          '  help                 print this help info\n' +
          '  clear                clear the terminal\n' +
          '  use &lt;tool-name&gt;      use a tool to draw, &lt;tool-name&gt; can be `pen`\n' +
          '  fill-color &lt;color&gt;   set up fill-color, please refer to canvas\' fillStyle for more info\n' + 
          '  stroke-color &lt;color&gt; set up stroke-clor, please refer to canvas\' strokeStyle for more info\n' +
          '  status               print the current canvas status.\n'
        );
      } else {
        cli.putError('Unknown cmd `' + args[0] + '`\n');
      }
    }); 
    
    // run terminal
    surf.initCLI();
  });

  // Mouse events
  $(document).ready(function() {
    $('#canvas').mousedown(function(e) {
      // Set up mouse down
      mouse_down_flag = true;

      cur_pos = pos2CanvasPos(e.pageX, e.pageY);
      
      // Call hook
      if(hook_mouse_down)
        hook_mouse_down();
      
      // set up pos
      start_pos = cur_pos;
      last_pos = cur_pos;
      
      // Prevent default drag behaviour
      e.stopPropagation();
      e.preventDefault();
    });

    $('body').mouseup(function(e) {
      // Set off mouse down
      mouse_down_flag = false;

      cur_pos = pos2CanvasPos(e.pageX, e.pageY);

      // Call hook
      if(hook_mouse_up)
        hook_mouse_up();

      // set up pos
      last_pos = cur_pos;

      e.stopPropagation();
    });

    $('#canvas').mousemove(function(e) {
      // Only triger on mousemove when mouse down
      if(mouse_down_flag) {
        cur_pos = pos2CanvasPos(e.pageX, e.pageY);

        // Call hook
        if(hook_mouse_move)
          hook_mouse_move();

        // set up pos
        last_pos = cur_pos;
      }

      e.stopPropagation();
    });
  });
})(jQuery);
