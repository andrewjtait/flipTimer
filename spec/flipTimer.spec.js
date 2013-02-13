describe("flipTimer", function() {
  var instance;

  beforeEach(function() {
    $('.example').flipTimer();
    instance = $('.example').data('flipTimer');
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

    it("should set seconds to true if div exists", function() {
      expect(instance.options.seconds).toBeTruthy();
    });

    it("should set minutes to true if div exists", function() {
      expect(instance.options.minutes).toBeTruthy();
    });

    it("should set hours to true if div exists", function() {
      expect(instance.options.hours).toBeTruthy();
    });

    it("should set days to true if div exists", function() {
      expect(instance.options.days).toBeTruthy();
    });
  });
});
