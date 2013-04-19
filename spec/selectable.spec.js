describe('Selectable', function() {
  
  var selectable;

  beforeEach(function() {
    // simple way to mixin an object
    selectable = _.extend({}, PickleMixins.Selectable); 
  });

  describe('when first created', function() {
    it('defaults to deselected', function() {
      expect(selectable.selected).to.equal(false); 
    });
  });

  describe('when calling #select()', function() {
    it('sets selected to true', function() {
      selectable.select();
      expect(selectable.selected).to.equal(true);
    });
  });
});
