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
    beforeEach(function() {
      // ensure we start off deselected
      selectable.selected = false;
    });

    it('sets selected to true', function() {
      selectable.select();
      expect(selectable.selected).to.equal(true);
    });

    it("triggers 'selected' with self", function() {
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

    it("does not trigger anything if already selected", function() {
      selectable.trigger = function() {};
      var spy = sinon.spy(selectable, 'trigger');

      selectable.selected = true;
      selectable.select();
      expect(spy).not.to.have.been.called;
    });

    it("does not call onSelected already selected", function() {
      selectable.onSelected = function() {};
      var spy = sinon.spy(selectable, 'onSelected');

      selectable.selected = true;
      selectable.select();
      expect(spy).not.to.have.been.called;
    });
  }); // when calling #select()

  describe("when calling #deselect()", function() {
    beforeEach(function() {
      // ensure we start off selected
      selectable.selected = true;
    });

    it("sets selected to false", function() {
      selectable.deselect();
      expect(selectable.selected).to.equal(false);
    });

    it("triggers 'deselected' with self", function() {
      selectable.trigger = function() {};
      var spy = sinon.spy(selectable, 'trigger');

      selectable.deselect();
      expect(spy).to.have.been.calledWith('deselected', selectable);
    });

    it("calls 'onDeselected'", function() {
      // no-op onSelected
      selectable.onDeselected = function() {};
      var spy = sinon.spy(selectable, 'onDeselected'); 

      selectable.deselect();
      expect(spy).to.have.been.called;
    });

    it("does not trigger anything if already deselected", function() {
      selectable.trigger = function() {};
      var spy = sinon.spy(selectable, 'trigger');

      selectable.selected = false;
      selectable.deselect();
      expect(spy).not.to.have.been.called;
    });

    it("does not call onDeselected if already deselected", function() {
      selectable.onDeselected = function() {};
      var spy = sinon.spy(selectable, 'onDeselected');

      selectable.selected = false;
      selectable.deselect();
      expect(spy).not.to.have.been.called;
    });
  }); // when calling #deselect()

  describe("when calling #toggleSelected", function() {
    var selectSpy;
    var deselectSpy;

    beforeEach(function() {
      // setup some spies on the select functions
      selectSpy = sinon.spy(selectable, 'select');
      deselectSpy = sinon.spy(selectable, 'deselect');
    });

    it("calls #select() if deselected", function() {
      selectable.selected = false;
      selectable.toggleSelected();

      expect(selectSpy).to.have.been.called;
      expect(deselectSpy).not.to.have.been.called;
    });

    it("calls #deselect() if selected", function() {
      selectable.selected = true;
      selectable.toggleSelected();

      expect(selectSpy).not.to.have.been.called;
      expect(deselectSpy).to.have.been.called;
    });
  });
});
