describe("MultiSelect", function() {
  var multi;
  var selectable;
  var selectable2;
  var selectable3;

  beforeEach(function() {
    // mixin onto a simple object
    multi = _.extend({}, PickleMixins.MultiSelect);

    // I've chosen not to mock up the selectable, as it just seems
    // like more work. Instead I get an actual selectable and spy
    // on it
    selectable  = _.extend({}, PickleMixins.Selectable);
    selectable2 = _.extend({}, PickleMixins.Selectable);
    selectable3 = _.extend({}, PickleMixins.Selectable);
  });

  describe("when first created", function() {
    it("should have an empty default selected array", function() {
      expect(multi.selected).to.be.an('array').and.to.be.empty; 
    });
  }); // when first created

  describe("when selecting an item with #selectItem()", function() {
    it("should call the selectable's #select() method", function() {
      var spy = sinon.spy(selectable, 'select');
      multi.selectItem(selectable); 
      
      expect(selectable.select).to.have.been.called;
    });

    it("should call #onSelectItem() if defined", function() {
      // no-op onSelectItem
      multi.onSelectItem = function() {};
      var spy = sinon.spy(multi, 'onSelectItem'); 

      multi.selectItem(selectable);
      expect(multi.onSelectItem).to.have.been.calledWith(selectable);
    });

    it("should add the selected item to the list", function() {
      multi.selectItem(selectable);

      expect(multi.selected).to.contain(selectable);
    });

    it.skip("should add all selected items to the list", function() {
    });

    describe("when a previous item is already selected", function() {
      it.skip("should not try calling #deselect()", function() {
      });
    }); // when a previous item is already selected
  }); // when selecting an item with #selectItem()

}); // SingleSelect
