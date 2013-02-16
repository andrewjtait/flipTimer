describe("flipTimer", function() {
  var instance;

  beforeEach(function() {
    $('.example').flipTimer();
    instance = $('.example').data('flipTimer');
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
  });

  describe("default options", function() {
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
