describe("SingleSelect", function() {
  var singleselect;
  var selectable;
  var selectable2;

  beforeEach(function() {
    // mixin onto a simple object
    singleselect = _.extend({}, PickleMixins.SingleSelect);

    // I've chosen not to mock up the selectable, as it just seems
    // like more work. Instead I get an actual selectable and spy
    // on it
    selectable  = _.extend({}, PickleMixins.Selectable);
    selectable2 = _.extend({}, PickleMixins.Selectable);
  });

  describe("when first created", function() {
    it("should have a default selected length of 0", function() {
      expect(singleselect.selectedLength).to.equal(0);     
    });

    it("should have a default selected object of null", function() {
      expect(singleselect.selected).to.be.null; 
    });
  });

  describe("when selecting an item with #selectItem()", function() {
    it("should call the selectable's #select() method", function() {
      var spy = sinon.spy(selectable, 'select');
      singleselect.selectItem(selectable); 
      
      expect(selectable.select).to.have.been.called;
    });

    it("should assign the current selected reference to the item", function() {
       singleselect.selectItem(selectable);

       expect(singleselect.selected).to.equal(selectable);
    });

    describe("when a previous item is already selected", function() {
      beforeEach(function() {
        singleselect.selectItem(selectable);
      });

      it("should dereference an previously selected item", function() {
        singleselect.selectItem(selectable2);

        expect(singleselect.selected).to.not.equal(selectable);
        expect(singleselect.selected).to.equal(selectable2);
      });

      it("should call the previous items #deselect() method", function() {
        var spy = sinon.spy(selectable, 'deselect'); 
        singleselect.selectItem(selectable2);
        
        expect(selectable.deselect).to.have.been.called;
      });
    });
  });
});
