(function($) {
  'use strict';

  // handle modal
  $(document).ready(function() {
    var $modal = $('div#upload-modal-container');
    // Hide the modal at first
    $modal.hide();

    // click on upload
    $('#show-upload-modal-button').click(function(e) {
      e.stopPropagation();
      e.preventDefault();

      $modal.fadeIn(1000);
    });

    // close upload
    $('#upload-modal-container').click(function(e) {
      var $tar = $(e.target);

      if($tar.attr('id') === 'upload-modal-container') {
        $modal.fadeOut(1000);
        e.stopPropagation();
        e.preventDefault();
      }
    });

    // submit button
    $('#upload-button').click(function(e) {
      var $form = $modal.find('form');
      $form.submit();
      return false;
    });
  });
})(jQuery);
