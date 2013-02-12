(function($) {

  var flipTimer = function($element) {
  };

  $.fn.flipTimer = function() {
    return this.each(function() {
      if (!$(this).data('flipTimer')) {
        $(this).data('flipTimer', new flipTimer($(this)));
      }
    });
  };

    /*
    var _this = this;

    // starts an interval of 1 second
    this.startTimer = function() {
      setInterval(function() {
        //_this.increaseDigit($('.seconds'));
      },1000);
    };

    // increases a digit
    /*
    this.increaseDigit = function($target) {
      var current = $target.find('.active'),
          previous = $target.find('.previous');

      previous.removeClass('previous');
      current.removeClass('active').addClass('previous');

      if (current.next().length == 0) {
        $target.find('.digit:first-child').addClass('active');
      } else {
        current.next().addClass('active');
      }
    };


    this.startTimer();
    */
})(jQuery);
