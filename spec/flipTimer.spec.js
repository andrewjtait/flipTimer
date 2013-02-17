describe("flipTimer", function() {
  var instance, options, altOptions;

  beforeEach(function() {
    // set some options for the test
    // set up an example with correct options
    options = {
      date: 'February 15, 2013 08:30:30',
      direction: 'up'
    };
    $('.example').flipTimer(options);
    instance = $('.example').data('flipTimer');

    // set up an example without any options or divs
    $('.empty-example').flipTimer();
    emptyInstance = $('.empty-example').data('flipTimer');

    // set up an example with alternative options
    altOptions = {
      date: 'February 22, 2014 08:30:30',
      direction: 'down'
    };
    $('.alt-example').flipTimer(altOptions);
    altInstance = $('.alt-example').data('flipTimer');
  });

  describe("initialise", function() {
    it("should create an instance of flipTimer", function() {
      expect(instance).toBeTruthy();
    });

    it("should add a property of element which is the html element instance was called on", function() {
      expect(instance.element).toMatch($('.example'));
    });

    it("should add a class of flipTimer to the html element", function() {
      expect(instance.element.hasClass('flipTimer')).toBeTruthy();
    });

    it("should accept an object of user defined options", function() {
      expect(instance.userOptions).toEqual(options);
    });

    it("should store date/time when initialised", function() {
      expect(instance.initDate).toBeTruthy();
    });
  });

  describe("default options", function() {
    it("should merge default options with user options", function() {
      // date is made into javascript date
      instance.userOptions.date = new Date(instance.userOptions.date);
      expect(instance.options).toEqual($.extend({}, instance.options, instance.userOptions));
    });

    describe("if user passes options", function() {
      it("should allow user to set date option", function() {
        expect(instance.options.date).toEqual(new Date(options.date));
      });

      it("should allow user to set direction option", function() {
        expect(instance.options.direction).toEqual(options.direction);
      });
    });

    describe("if user does not pass options", function() {
      it("should provide default date option", function() {
        expect(emptyInstance.options.date).toEqual(new Date(emptyInstance.defaultOptions.date));
      });

      it("should provide default direction option", function() {
        expect(emptyInstance.options.direction).toEqual(emptyInstance.defaultOptions.direction);
      });
    });

    it("should define a template for digits", function() {
      var template = '' +
        '<div class="digit">' +
        '  <div class="digit-top">' +
        '    <span class="digit-wrap"></span>' +
        '  </div>' +
        '  <div class="digit-bottom">' +
        '    <span class="digit-wrap"></span>' +
        '  </div>' +
        '</div>';
      expect(instance.options.digitTemplate).toEqual(template);
    });

    describe("when instance contains required divs", function() {
      it("should set seconds to the object if div exists", function() {
        expect(instance.options.seconds).toEqual(instance.element.find('.seconds')[0]);
      });

      it("should set minutes to the object if div exists", function() {
        expect(instance.options.minutes).toEqual(instance.element.find('.minutes')[0]);
      });

      it("should set hours to the object if div exists", function() {
        expect(instance.options.hours).toEqual(instance.element.find('.hours')[0]);
      });

      it("should set days to the object if div exists", function() {
        expect(instance.options.days).toEqual(instance.element.find('.days')[0]);
      });
    });

    describe("when instance does not contain required divs", function() {
      it("should set seconds to false if div does not exist", function() {
        expect(emptyInstance.options.seconds).toEqual(false);
      });

      it("should set minutes to false if div does not exist", function() {
        expect(emptyInstance.options.minutes).toEqual(false);
      });

      it("should set hours to false if div does not exist", function() {
        expect(emptyInstance.options.hours).toEqual(false);
      });

      it("should set days to false if div does not exist", function() {
        expect(emptyInstance.options.days).toEqual(false);
      });
    });
  });

  describe("calculateDate", function() {
    var dateDiff, seconds, minutes, hours, days;

    beforeEach(function() {
      spyOn(instance, 'render');

      // run calculations here to compare with those generated
      dateDiff = instance.initDate - instance.options.date;
      seconds = Math.floor(dateDiff/1000) % 60;
      minutes = Math.floor(dateDiff/1000/60) % 60;
      hours = Math.floor(dateDiff/1000/3600) % 24;
      days = Math.floor(dateDiff/1000/60/60/24);

      instance.calculateDate();
    });

    it("should set the days to count down/up from", function() {
      expect(instance.days).toEqual(days);
    });

    it("should set the hours to count down/up from", function() {
      expect(instance.hours).toEqual(hours);
    });

    it("should set the minutes to count down/up from", function() {
      expect(instance.minutes).toEqual(minutes);
    });

    it("should set the seconds to count down/up from", function() {
      expect(instance.seconds).toEqual(seconds);
    });

    it("should call render method", function() {
      expect(instance.render).toHaveBeenCalled();
    });
  });

  describe("render", function() {
    beforeEach(function() {
      spyOn(instance, 'renderDigits');
      spyOn(instance, 'startTimer');
      instance.render();
    });

    it("should call renderDigits on seconds", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.seconds, instance.seconds);
    });

    it("should call renderDigits on minutes", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.minutes, instance.minutes);
    });

    it("should call renderDigits on hours", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.hours, instance.hours);
    });

    it("should call renderDigits on days", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.days, instance.days);
    });

    describe("renderDigits", function() {
      it("should render 2 digit-array divs to contain digit sets", function() {
        expect(instance.element.find('.seconds .digit-set').length).toEqual(2);
      });

      it("should render 10 digitTemplates inside the subject", function() {
        expect(instance.element.find('.seconds .digit-set:first-child .digit').length).toEqual(10);
      });

      it("should output digits 0 through 9 for each digitTemplate if the direction is up", function() {
        expect(instance.element.find('.seconds .digit:first-child .digit-wrap').html()).toEqual('0');
        expect(instance.element.find('.seconds .digit:last-child .digit-wrap').html()).toEqual('9');
      });

      it("should output digits 9 through 0 for each digitTemplate if the direction is down", function() {
        expect(altInstance.element.find('.seconds .digit:first-child .digit-wrap').html()).toEqual('9');
        expect(altInstance.element.find('.seconds .digit:last-child .digit-wrap').html()).toEqual('0');
      });
    });

    describe("initial state of active and previous", function() {
      var number_array, firstChildInt, lastChildInt;

      beforeEach(function() {
        number_array = String((instance.seconds / 10).toFixed(1)).split('.');
      });

      it("should add active class to the relevant digit", function() {
        expect(instance.element.find('.seconds .digit-set:first-child .active').index()).toEqual(parseInt(number_array[0]));
        expect(instance.element.find('.seconds .digit-set:last-child .active').index()).toEqual(parseInt(number_array[1]));
      });

      it("should add previous class to the relevant digit", function() {
        firstChildInt = (number_array[0] == 0) ? 10 : number_array[0];
        lastChildInt = (number_array[1] == 0) ? 10 : number_array[1];

        expect(instance.element.find('.seconds .digit-set:first-child .previous').index()).toEqual(parseInt(firstChildInt - 1));
        expect(instance.element.find('.seconds .digit-set:last-child .previous').index()).toEqual(parseInt(lastChildInt - 1));
      });
    });

    it("should start the timer", function() {
      expect(instance.startTimer).toHaveBeenCalled();
    });
  });

  describe("startTimer", function() {
    beforeEach(function() {
      spyOn(instance, 'increaseDigit');
      jasmine.Clock.useMock();
      instance.startTimer();
    });

    it("should not have called increaseDigit yet", function() {
      jasmine.Clock.tick(999);
      expect(instance.increaseDigit).not.toHaveBeenCalled();
    });

    it("should call increaseDigit every second", function() {
      jasmine.Clock.tick(1000);
      expect(instance.increaseDigit.calls.length).toEqual(1);
      jasmine.Clock.tick(1000);
      expect(instance.increaseDigit.calls.length).toEqual(2);
      jasmine.Clock.tick(1000);
      expect(instance.increaseDigit.calls.length).toEqual(3);
      // ... you get the idea
    });
  });

  describe("increaseDigit", function() {
    beforeEach(function() {
      jasmine.Clock.useMock();
    });

    it("should increase the second value every second", function() {
      var initialVal = instance.seconds;
      jasmine.Clock.tick(1000);
      expect(instance.seconds).toEqual(initialVal + 1);
      jasmine.Clock.tick(1000);
      expect(instance.seconds).toEqual(initialVal + 2);
    });
  });
});
