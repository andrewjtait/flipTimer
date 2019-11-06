jasmine.getFixtures().fixturesPath = 'base/spec';

describe("flipTimer", function() {
  var instance, options, altOptions, date = new Date(),
      pastDate = date.setMonth(date.getMonth() - 1),
      futureDate = date.setMonth(date.getMonth() + 2);

  beforeEach(function() {
    loadFixtures("template.html");

    jasmine.clock().uninstall();
    jasmine.clock().install();

    // set some options for the test
    // set up an example with correct options
    options = {
      date: pastDate,
      direction: 'up'
    };
    $('.example').flipTimer(options);
    instance = $('.example').data('flipTimer');

    // set up an example without any options or divs
    $('.empty-example').flipTimer();
    emptyInstance = $('.empty-example').data('flipTimer');

    // set up an example with alternative options
    altOptions = {
      date: futureDate,
      direction: 'down',
      callback: function() { console.log('callback'); }
    };
    $('.alt-example').flipTimer(altOptions);
    altInstance = $('.alt-example').data('flipTimer');
  });

  describe("initialise", function() {
    it("should create an instance of flipTimer", function() {
      expect(instance).toBeTruthy();
    });

    it("should add a property of element which is the html element instance was called on", function() {
      expect(instance.element.attr("class")).toEqual($('.example').attr("class"));
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
        '  <div class="shadow-top"></div>' +
        '  <div class="digit-bottom">' +
        '    <span class="digit-wrap"></span>' +
        '  </div>' +
        '  <div class="shadow-bottom"></div>' +
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

      it("should render 6 digitTemplates inside the subject:first-child", function() {
        expect(instance.element.find('.seconds .digit-set:first-child .digit').length).toEqual(6);
      });

      it("should render 10 digitTemplates inside the subject:last-child", function() {
        expect(instance.element.find('.seconds .digit-set:last-child .digit').length).toEqual(10);
      });

      it("should output digits 0 through 9 for each digitTemplate if the direction is up", function() {
        expect(instance.element.find('.seconds .digit-set:last-child .digit:first-child .digit-wrap').html()).toEqual('0');
        expect(instance.element.find('.seconds .digit-set:last-child .digit:last-child .digit-wrap').html()).toEqual('9');
      });

      it("should output digits 9 through 0 for each digitTemplate if the direction is down", function() {
        expect(altInstance.element.find('.seconds .digit-set:last-child .digit:first-child .digit-wrap').html()).toEqual('9');
        expect(altInstance.element.find('.seconds .digit-set:last-child .digit:last-child .digit-wrap').html()).toEqual('0');
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
        firstChildInt = (number_array[0] == 0) ? 6 : number_array[0];
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
    var initialVal;

    beforeEach(function() {
      spyOn(instance, 'increaseDigit');
      instance.startTimer();
    });

    it("should not have called increaseDigit yet", function() {
      jasmine.clock().tick(999);
      expect(instance.increaseDigit).not.toHaveBeenCalled();
    });

    it("should call increaseDigit every second", function() {
      jasmine.clock().tick(1000);
      expect(instance.increaseDigit.calls.count()).toEqual(1);
      jasmine.clock().tick(1000);
      expect(instance.increaseDigit.calls.count()).toEqual(2);
      jasmine.clock().tick(1000);
      expect(instance.increaseDigit.calls.count()).toEqual(3);
      // ... you get the idea
    });

    describe("counting up", function() {
      it("should increase the second value every second", function() {
        instance.seconds = 30;
        initialVal = instance.seconds;
        jasmine.clock().tick(1000);
        expect(instance.seconds).toEqual(initialVal + 1);
        expect(instance.increaseDigit).toHaveBeenCalledWith(instance.options.seconds);
      });

      it("should reset seconds to 0 if it reaches 60 and increase minutes by 1", function() {
        initialVal = instance.minutes;
        instance.seconds = 59;
        jasmine.clock().tick(1000);
        expect(instance.seconds).toEqual(0);
        expect(instance.increaseDigit).toHaveBeenCalledWith(instance.options.minutes);
      });

      it("should reset minutes to 0 if it reaches 60 and increase hours by 1", function() {
        initialVal = instance.hours;
        instance.seconds = 59;
        instance.minutes = 59;
        jasmine.clock().tick(1000);
        expect(instance.minutes).toEqual(0);
        expect(instance.increaseDigit).toHaveBeenCalledWith(instance.options.hours);
      });

      it("should reset hours to 0 if it reaches 24 and increase days by 1", function() {
        initialVal = instance.days;
        instance.seconds = 59;
        instance.minutes = 59;
        instance.hours = 23;
        jasmine.clock().tick(1000);
        expect(instance.hours).toEqual(0);
        expect(instance.increaseDigit).toHaveBeenCalledWith(instance.options.days);
      });

      describe("when time runs out", function() {
        beforeEach(function() {
          spyOn(window, 'clearInterval');
          instance.days = 999;
          instance.hours = 23;
          instance.minutes = 59;
          instance.seconds = 59;
        });

        it("should stop the timer when it reaches full time", function() {
          jasmine.clock().tick(1000);
          expect(clearInterval).toHaveBeenCalledWith(instance.timer);
        });
      });
    });

    describe("counting down", function() {
      beforeEach(function() {
        altInstance.startTimer();
        spyOn(altInstance.options, 'callback');
      });

      it("should decrease the second value every second", function() {
        altInstance.seconds = 35;
        initialVal = altInstance.seconds;
        jasmine.clock().tick(1000);
        expect(altInstance.seconds).toEqual(initialVal - 1);
      });

      it("should reset seconds to 59 if it reaches 0 and decrease minutes by 1", function() {
        initialVal = altInstance.minutes;
        altInstance.seconds = 0;
        jasmine.clock().tick(1000);
        expect(altInstance.seconds).toEqual(59);
      });

      it("should reset minutes to 59 if it reaches 0 and decrease hours by 1", function() {
        initialVal = altInstance.hours;
        altInstance.seconds = 0;
        altInstance.minutes = 0;
        jasmine.clock().tick(1000);
        expect(altInstance.minutes).toEqual(59);
      });

      it("should reset hours to 23 if it reaches 0 and decrease days by 1", function() {
        initialVal = altInstance.days;
        altInstance.seconds = 0;
        altInstance.minutes = 0;
        altInstance.hours = 0;
        jasmine.clock().tick(1000);
        expect(altInstance.hours).toEqual(23);
      });

      it("should not execute a callback til time runs out", function() {
        jasmine.clock().tick(1000);
        expect(altInstance.options.callback).not.toHaveBeenCalled();
      });

      describe("when time runs out", function() {
        beforeEach(function() {
          spyOn(window, 'clearInterval');
          altInstance.days = 0;
          altInstance.hours = 0;
          altInstance.minutes = 0;
          altInstance.seconds = 0;
        });

        it("should stop the timer when it reaches zero", function() {
          jasmine.clock().tick(1000);
          expect(clearInterval).toHaveBeenCalledWith(altInstance.timer);
        });

        it("should execute a callback if user has specified one", function() {
          jasmine.clock().tick(1000);
          expect(altInstance.options.callback).toHaveBeenCalled();
        });
      });
    });
  });

  describe("increaseDigit", function() {
    var current;

    beforeEach(function() {
      instance.seconds = 25;
      instance.startTimer();
    });

    it("should add active class to digit relative to current second", function() {
      current = instance.element.find('.seconds .digit-set:last-child .active').index();
      current = current + 1;
      current = (current == 10) ? 0 : current;
      jasmine.clock().tick(1000);
      expect(instance.element.find('.seconds .digit-set:last-child .active').index()).toEqual(current);
    });

    it("should add previous class to digit relative to current second", function() {
      current = instance.element.find('.seconds .digit-set:last-child .active').index();
      jasmine.clock().tick(1000);
      expect(instance.element.find('.seconds .digit-set:last-child .previous').index()).toEqual(current);
    });
  });
});
