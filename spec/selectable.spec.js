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

    it("triggers 'selected'", function() {
      // no-op trigger
      selectable.trigger = function() {};
      var spy = sinon.spy(selectable, 'trigger'); 

      selectable.select();
      expect(spy).to.have.been.calledWith('selected', selectable);
    });

    it("calls 'onSelected'", function() {
      // no-op onSelected
      selectable.onSelected = function() {};
      var spy = sinon.spy(selectable, 'onSelected'); 

      selectable.select();
      expect(spy).to.have.been.called;
    });

    it("does not trigger anything if already true", function() {
      selectable.trigger = function() {};
      var spy = sinon.spy(selectable, 'trigger');

      selectable.selected = true;
      selectable.select();
      expect(spy).not.to.have.been.called;
    });

    it("does not call onSelected already true", function() {
      selectable.onSelected = function() {};
      var spy = sinon.spy(selectable, 'onSelected');

      selectable.selected = true;
      selectable.select();
      expect(spy).not.to.have.been.called;
    });
  });
});
