describe("flipTimer", function() {
  var instance, options, altOptions;

  beforeEach(function() {
    // set some options for the test
    // set up an example with correct options
    options = {
      date: '2012,12,25,18,30,10',
      direction: 'up'
    };
    $('.example').flipTimer(options);
    instance = $('.example').data('flipTimer');

    // set up an example without any options or divs
    $('.empty-example').flipTimer();
    emptyInstance = $('.empty-example').data('flipTimer');

    // set up an example with alternative options
    altOptions = {
      date: '2013,12,25,18,30,10',
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
  });

  describe("default options", function() {
    it("should merge default options with user options", function() {
      expect(instance.options).toEqual($.extend({}, instance.options, instance.userOptions));
    });

    describe("if user passes options", function() {
      it("should allow user to set date option", function() {
        expect(instance.options.date).toEqual(options.date);
      });

      it("should allow user to set direction option", function() {
        expect(instance.options.direction).toEqual(options.direction);
      });
    });

    describe("if user does not pass options", function() {
      it("should provide default date option", function() {
        expect(emptyInstance.options.date).toEqual(emptyInstance.defaultOptions.date);
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

  describe("render", function() {
    beforeEach(function() {
      spyOn(instance, 'renderDigits');
      spyOn(instance, 'startTimer');
      instance.render();
    });

    it("should call renderDigits on seconds", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.seconds);
    });

    it("should call renderDigits on minutes", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.minutes);
    });

    it("should call renderDigits on hours", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.hours);
    });

    it("should call renderDigits on days", function() {
      expect(instance.renderDigits).toHaveBeenCalledWith(instance.options.days);
    });

    describe("renderDigits", function() {
      it("should render 10 digitTemplates inside the subject", function() {
        expect(instance.element.find('.seconds .digit').length).toEqual(10);
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
});
