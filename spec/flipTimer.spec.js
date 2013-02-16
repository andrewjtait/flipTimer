describe("flipTimer", function() {
  var instance, options;

  beforeEach(function() {
    // set some options for the test
    options = {
      date: '2013,12,25,18,30,10',
      direction: 'down'
    };
    // set up an example with correct options
    $('.example').flipTimer(options);
    instance = $('.example').data('flipTimer');
    // set up an example without any options or divs
    $('.empty-example').flipTimer();
    emptyInstance = $('.empty-example').data('flipTimer');
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
        '<div class="digit previous">' +
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
});
