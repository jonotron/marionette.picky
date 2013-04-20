describe("SingleSelect", function() {
  var singleselect;

  beforeEach(function() {
    singleselect = _.extend({}, PickleMixins.SingleSelect);
  });

  describe("when first created", function() {
    it("should have a default selected length of 0", function() {
      expect(singleselect.selectedLength).to.equal(0);     
    });

    it("should have a default selected object of null", function() {
      expect(singleselect.selected).to.be.null; 
    });
  });
});
