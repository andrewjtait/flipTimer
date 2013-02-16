(function($) {

  /**
   * @class flipTimer
   * @constructor
   *
   * @param element {HTMLElement} the element flipTimer is called on
   */
  var flipTimer = function(element, options) {
    this.element = element;

    // ensures the HTMLElement has a class of 'flipTimer'
    if (!this.element.hasClass('flipTimer')) {
      this.element.addClass('flipTimer');
    }

    // attach users options to instance
    this.userOptions = options;

    // attach default options to instance
    this.defaultOptions = flipTimer.defaults;

    // merge default options with user options and attach to instance
    this.options = $.extend({}, this.defaultOptions, this.userOptions);

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

    // render the html for the plugin
    this.render();
  };

  flipTimer.defaults = {
    seconds: false,
    minutes: false,
    hours: false,
    days: false,
    date: '2013,01,01,01,01,01',
    direction: 'up',
    digitTemplate: '' +
      '<div class="digit">' +
      '  <div class="digit-top">' +
      '    <span class="digit-wrap"></span>' +
      '  </div>' +
      '  <div class="digit-bottom">' +
      '    <span class="digit-wrap"></span>' +
      '  </div>' +
      '</div>'
  };

  flipTimer.prototype = {
    /**
     * Dictates what needs rendering for the plugin
     *
     * @method render
     */
    render: function() {
      // if using seconds, populate it
      if (this.options.seconds) {
        this.renderDigits(this.options.seconds);
      }
      // if using minutes, populate it
      if (this.options.minutes) {
        this.renderDigits(this.options.minutes);
      }
      // if using hours, populate it
      if (this.options.hours) {
        this.renderDigits(this.options.hours);
      }
      // if using days, populate it
      if (this.options.minutes) {
        this.renderDigits(this.options.days);
      }
    },

    /**
     * Renders the digits for a given subject
     *
     * @method renderDigits
     * @param subject {HTMLElement} the element to generate digits for
     */
    renderDigits: function(subject) {
      var i, x, currentDigit, _this = this;

      if ($(subject).find('.digit').length == 0) {
        for(i=0; i<10; i++) {
          $(subject).append(_this.options.digitTemplate);
          currentDigit = $(subject).find('.digit')[i];
          if (_this.options.direction == 'up') {
            x = 9 - i;
          } else {
            x = i;
          }
          $(currentDigit).find('.digit-wrap').append(x);
        }
      }
    }
  };

  $.fn.flipTimer = function(options) {
    return this.each(function() {
      if (!$(this).data('flipTimer')) {
        $(this).data('flipTimer', new flipTimer($(this), options));
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
