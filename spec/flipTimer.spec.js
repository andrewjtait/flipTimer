describe("flipTimer", function() {
  var instance;

  beforeEach(function() {
    $('.flipTimer').flipTimer();
    instance = $('.flipTimer').data('flipTimer');
  });

  describe("initialise", function() {
    it("should create an instance of flipTimer", function() {
      expect(instance).toBeTruthy();
    });
  });
});
