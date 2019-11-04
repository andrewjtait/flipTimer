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

    // store the date/time when initialised
    this.initDate = new Date();

    // make the date into a javascript date
    this.options.date = new Date(this.options.date);

    // untested
    this.calculateDate();
  };

  flipTimer.defaults = {
    seconds: false,
    minutes: false,
    hours: false,
    days: false,
    date: new Date().toDateString(),
    direction: 'up',
    callback: null,
    digitTemplate: '' +
      '<div class="digit">' +
      '  <div class="digit-top">' +
      '    <span class="digit-wrap"></span>' +
      '  </div>' +
      '  <div class="shadow-top"></div>' +
      '  <div class="digit-bottom">' +
      '    <span class="digit-wrap"></span>' +
      '  </div>' +
      '  <div class="shadow-bottom"></div>' +
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
        dateDiff = this.options.date - this.initDate;
      } else if (this.options.direction == 'up') {
        dateDiff = this.initDate - this.options.date;
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
        this.renderDigits(this.options.seconds, this.seconds);
      }
      // if using minutes, populate it
      if (this.options.minutes) {
        this.renderDigits(this.options.minutes, this.minutes);
      }
      // if using hours, populate it
      if (this.options.hours) {
        this.renderDigits(this.options.hours, this.hours);
      }
      // if using days, populate it
      if (this.options.days) {
        this.renderDigits(this.options.days, this.days);
      }

      this.startTimer();
    },

    /**
     * Renders the digits for a given subject
     *
     * @method renderDigits
     * @param subject {HTMLElement} the element to generate digits for
     */
    renderDigits: function(subject, value) {
      var i, x, max, maxDigit, currentDigit, _this = this, number_array;
      // if digits are not already rendered...
      if ($(subject).find('.digit').length == 0) {
        // split the value into two individual digits
        // unless time has ran out
        if (_this.days < 0 && _this.hours < 0 && _this.minutes < 0 && _this.seconds < 0) {
          number_array = [0,0];
        } 
        else {
          number_array = String(value).split(""); // split all digits
        
          // ensure the set is at least 2 digits long
          if (number_array.length < 2) {
            number_array.unshift(0)
          }
        }

        // set maximum digits for seconds/minutes/hours
        if (subject == _this.options.seconds || subject == _this.options.minutes) {
          // minutes and seconds max digit
          maxDigit = 5;
        } else if (subject == _this.options.hours) {
          // hours max digit
          maxDigit = 2;
        } else {
          // everything else digit max
          maxDigit = 9;
        }

        // append a div for each digit
        number_array.forEach(function() {
          $(subject).append('<div class="digit-set"></div>');
        });

        // for each digit-set in the subject
        $(subject).find('.digit-set').each(function(el) {
          // if first digit, then use digit max
          max = (el == 0) ? maxDigit : 9;

          // generate the right number of digits
          for(i=0; i<=max; i++) {
            // append the digit template
            $(this).append(_this.options.digitTemplate);

            // if direction is down then make numbers decline
            x = (_this.options.direction == 'down') ? max - i : i;

            // select the current digit and apply the number to it
            currentDigit = $(this).find('.digit')[i];
            $(currentDigit).find('.digit-wrap').append(x);

            // if the current number matches the value then apply active class
            if (x == number_array[el]) {
              $(currentDigit).addClass('active');
            } else if (number_array[el] != 0 && ((x + 1) == number_array[el])) {
              // if the current number is one less than active but not zero
              $(currentDigit).addClass('previous');
            } else if (number_array[el] == 0 && x == max) {
              // if the current number is zero then apply previous to max
              $(currentDigit).addClass('previous');
            }
          }
        });
      }
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
        // if timer runs out stop the timer
        if (_this.days <= 0 && _this.hours <= 0 && _this.minutes <= 0 && _this.seconds <= 0) {
          // execute callback if one exists
          if (_this.options.callback) {
            _this.options.callback();
          }

          clearInterval(_this.timer);
          return;
        }

        // if timer runs out stop the timer
        if ((_this.days > 999) || (_this.days == 999 && _this.hours == 23 && _this.minutes == 59 && _this.seconds == 59)) {
          clearInterval(_this.timer);
          return;
        }

        // increase/decrease seconds
        (_this.options.direction == 'down') ? _this.seconds-- : _this.seconds++;
        if (_this.options.seconds) _this.increaseDigit(_this.options.seconds);

        // increase/decrease minutes
        if (_this.seconds == 60 || _this.seconds == -1) {
          if (_this.options.direction == 'down') {
            _this.seconds = 59;
            _this.minutes--;
          } else {
            _this.seconds = 0;
            _this.minutes++;
          }
          if (_this.options.minutes) _this.increaseDigit(_this.options.minutes);
        }

        // increase/decrease hours
        if (_this.minutes == 60 || _this.minutes == -1) {
          if (_this.options.direction == 'down') {
            _this.minutes = 59;
            _this.hours--;
          } else {
            _this.minutes = 0;
            _this.hours++;
          }
          if (_this.options.hours) _this.increaseDigit(_this.options.hours);
        }

        // increase/decrease days
        if (_this.hours == 24 || _this.hours == -1) {
          if (_this.options.direction == 'down') {
            _this.hours = 23;
            _this.days--;
          } else {
            _this.hours = 0;
            _this.days++;
          }
          if (_this.options.days) _this.increaseDigit(_this.options.days);
        }
      },1000);
    },

    /**
     * Changes classes on the digits to increase the number
     *
     * @method increaseDigit
     * @param target {HTMLElement} the element to increase digit for
     */
    increaseDigit: function(target) {
      var digitSets = new Array(), _this = this;

      // find all digit-sets related to digit type
      $(target).find('.digit-set').each(function() {
        digitSets.push(this);
      });

      // increase individual digit
      increase(digitSets[digitSets.length - 1]);

      /**
       * Increases individual digit in a digit-set
       *
       * @param el {HTMLElement} the digit-set being increased
       */
      function increase(el) {
        var current = $(el).find('.active'),
            previous = $(el).find('.previous'),
            index = $.inArray(el, digitSets);

        previous.removeClass('previous');
        current.removeClass('active').addClass('previous');

        if (current.next().length == 0) {
          if (_this.options.direction == 'down'
              && target == _this.options.hours
              && (_this.hours == -1 || _this.hours == 23)
              && $(el).find('.digit').length == 10) {
            // if the hours digit reaches 0 it should make 24 active
            $($(el).find('.digit')[6]).addClass('active');
          } else {
            // increase to first digit in set
            $(el).find('.digit:first-child').addClass('active');
          }
          if (index != 0) {
            // increase digit of sibling digit-set
            increase(digitSets[index - 1]);
          }
        } else {
          if (_this.options.direction == "up"
              && target == _this.options.hours
              && _this.hours == 24) {
            // if the hours digit reaches 24 it should make 0 active
            $(el).find('.digit:first-child').addClass('active');
            increase(digitSets[index - 1]);
          } else {
            // increase the next digit
            current.next().addClass('active');
          }
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
})(jQuery);
