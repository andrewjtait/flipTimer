(function($) {

  /**
   * @class flipTimer
   * @constructor
   *
   * @param element {HTMLElement} the element flipTimer is called on
   */
  var flipTimer = function(element) {
    this.element = element;

    // ensures the HTMLElement has a class of 'flipTimer'
    if (!this.element.hasClass('flipTimer')) {
      this.element.addClass('flipTimer');
    }

    // attach default options to instance
    this.options = $.extend({}, this.options, flipTimer.defaults);

    // detects if the seconds digits should be used
    if (this.element.find('.seconds').length > 0) {
      this.options.seconds = this.element.find('.seconds')[0];
    }

    // detects if the minutes digits should be used
    if (this.element.find('.minutes').length > 0) {
      this.options.minutes = this.element.find('.minutes')[0];
    }

    // detects if the hours digits should be used
    if (this.element.find('.hours').length > 0) {
      this.options.hours = this.element.find('.hours')[0];
    }

    // detects if the days digits should be used
    if (this.element.find('.days').length > 0) {
      this.options.days = this.element.find('.days')[0];
    }
  };

  flipTimer.defaults = {
    seconds: false,
    minutes: false,
    hours: false,
    days: false,
    digitTemplate: '' +
      '<div class="digit previous">' +
      '  <div class="digit-top">' +
      '    <span class="digit-wrap"></span>' +
      '  </div>' +
      '  <div class="digit-bottom">' +
      '    <span class="digit-wrap"></span>' +
      '  </div>' +
      '</div>'
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
