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

    // untested
    this.calculateDate();
  };

  flipTimer.defaults = {
    seconds: false,
    minutes: false,
    hours: false,
    days: false,
    date: 'January 1, 2013 08:30:30',
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
     * Calculates the difference in date for the timer
     *
     * @method calculateDate
     */
    calculateDate: function() {
      var dateDiff;

      // calculates the difference in dates
      if (this.options.direction == 'down') {
        dateDiff = new Date(this.options.date) - new Date();
      } else if (this.options.direction == 'up') {
        dateDiff = new Date() - new Date(this.options.date);
      }

      // sets the date/time on the instance
      this.seconds = Math.floor(dateDiff/1000) % 60;
      this.minutes = Math.floor(dateDiff/1000/60) % 60;
      this.hours = Math.floor(dateDiff/1000/3600) % 24;
      this.days = Math.floor(dateDiff/1000/60/60/24);

      // render the html for the plugin
      this.render();
    },

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

      this.startTimer();
    },

    /**
     * Renders the digits for a given subject
     *
     * @method renderDigits
     * @param subject {HTMLElement} the element to generate digits for
     */
    renderDigits: function(subject) {
      var i, x, currentDigit, _this = this, seconds_split, seconds_array;

      // append two divs to contain two sets of digits for each subject
      $(subject).append('<div class="digit-set"></div><div class="digit-set"></div>');

      // append the digitTemplate 10 times to each digit-set
      if ($(subject).find('.digit').length == 0) {
        $(subject).find('.digit-set').each(function() {
          for(i=0; i<10; i++) {
            $(this).append(_this.options.digitTemplate);
            currentDigit = $(this).find('.digit')[i];
            if (_this.options.direction == 'down') {
              x = 9 - i;
            } else {
              x = i;
            }
            $(currentDigit).find('.digit-wrap').append(x);
          }
        });
      }

      // untested
      seconds_split = String(this.seconds / 10);
      seconds_array = seconds_split.split('.');
      $(this.element.find('.seconds .digit-set:last-child .digit')[seconds_array[1]]).addClass('active');
      $(this.element.find('.seconds .digit-set:last-child .digit')[seconds_array[1] - 1]).addClass('previous');
      $(this.element.find('.seconds .digit-set:first-child .digit')[seconds_array[0]]).addClass('active');
      $(this.element.find('.seconds .digit-set:first-child .digit')[seconds_array[0] - 1]).addClass('previous');
      // end of untested
    },

    /**
     * Start a timer with an interval of 1 second
     *
     * @method startTimer
     */
    startTimer: function() {
      var _this = this;

      clearInterval(this.timer);
      this.timer = setInterval(function() {
        _this.increaseDigit(_this.options.seconds);
      },1000);
    },

    /**
     * Changes classes on the digits to increase the number
     *
     * @method increaseDigit
     * @param target {HTMLElement} the element to increase digit for
     */
    increaseDigit: function(target) {
      this.seconds++;
      console.log(this.seconds);
      /*
      var current = $(target).find('.active'),
          previous = $(target).find('.previous');

      previous.removeClass('previous');
      current.removeClass('active').addClass('previous');

      if (current.next().length == 0) {
        $(target).find('.digit:first-child').addClass('active');
      } else {
        current.next().addClass('active');
      }
      */
    }
  };

  $.fn.flipTimer = function(options) {
    return this.each(function() {
      if (!$(this).data('flipTimer')) {
        $(this).data('flipTimer', new flipTimer($(this), options));
      }
    });
  };
})(jQuery);
