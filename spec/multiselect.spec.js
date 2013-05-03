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

  describe("#isItemSelected", function() {
    beforeEach(function() {
      multi.selectItem(selectable);
    });

    it("should return true if the item is selected", function() {
      expect(multi.isItemSelected(selectable)).to.be.true;
    });

    it("should return true if the item is selected", function() {
      expect(multi.isItemSelected(selectable2)).to.be.false;
    });
  });

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

    it("should add the selected item to the selected list", function() {
      multi.selectItem(selectable);

      expect(multi.selected).to.contain(selectable);
    });

    describe("when a previous item is already selected", function() {
      beforeEach(function() {
        multi.selectItem(selectable);
      });

      it("should not try calling #deselect()", function() {
        var spy = sinon.spy(selectable, 'deselect');
        multi.selectItem(selectable2);

        expect(selectable.deselect).to.not.have.been.called;
      });

      it("should add a new item to the selected list", function() {
        multi.selectItem(selectable2);

        expect(multi.selected).to.contain(selectable)
          .and.to.contain(selectable2);
      });

      describe("when selecting a previous item again", function() {
        it("should keep the item in the selected list", function() {
          multi.selectItem(selectable);
          expect(multi.selected).to.contain(selectable);
        });

        it("should not try to call #deselect()", function() {
          var spy = sinon.spy(selectable, 'deselect');
          multi.selectItem(selectable);  
          expect(selectable.deselect).to.not.have.been.called;
        });
        
        it("should not try to call #select()", function() {
          var spy = sinon.spy(selectable, 'select');
          multi.selectItem(selectable);
          expect(selectable.select).to.not.have.been.called;
        });
      });
    }); // when a previous item is already selected
  }); // when selecting an item with #selectItem()

  describe("when deselecting and item with #deselectItem", function() {
    beforeEach(function() {
      multi.selectItem(selectable);
    });  

    it("should call the selectables #deselect() method", function() {
      var spy = sinon.spy(selectable, 'deselect');
      multi.deselectItem(selectable);

      expect(selectable.deselect).to.have.been.called;
    });
  });

}); // SingleSelect
