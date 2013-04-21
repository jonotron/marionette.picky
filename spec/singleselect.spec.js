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
  }); // when first created

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

    it("should call #onSelectItem() if defined", function() {
      // no-op onSelectItem
      singleselect.onSelectItem = function() {};
      var spy = sinon.spy(singleselect, 'onSelectItem'); 

      singleselect.selectItem(selectable);
      expect(singleselect.onSelectItem).to.have.been.calledWith(selectable);
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

      describe("when selecting the previous item again", function() {
        it("should keep the item as selected", function() {
          singleselect.selectItem(selectable);
          expect(singleselect.selected).to.equal(selectable);
        });

        it("should not try to call #deselect()", function() {
          var spy = sinon.spy(selectable, 'deselect');
          singleselect.selectItem(selectable);
          expect(selectable.deselect).to.not.have.been.called;
        });

        it("should not try to call #select()", function() {
          var spy = sinon.spy(selectable, 'select');
          singleselect.selectItem(selectable);
          expect(selectable.select).to.not.have.been.called;
        });

        it("should not try to call #onSelectItem()", function() {
          // no-on onSelectItem
          singleselect.onSelectItem = function() {}; 
          var spy = sinon.spy(singleselect, 'onSelectItem');

          singleselect.selectItem(selectable);
          expect(singleselect.onSelectItem).to.not.have.been.called;
        });
      }); // when selecting the previous item again
    }); // when a previous item is already selected
  }); // when selecting an item with #selectItem()

  describe("when deselecting and item with #deselectItem", function() {
    beforeEach(function() {
      singleselect.selectItem(selectable);
    });

    it("should call the selectable's #deselect() method", function() {
      var spy = sinon.spy(selectable, 'deselect'); 
      singleselect.deselectItem(selectable);

      expect(selectable.deselect).to.have.been.called;
    });  

    it("should dereference the current selected reference", function() {
      singleselect.deselectItem(selectable);

      expect(singleselect.selected).to.be.null;
    });

    it("should call #onDeselectItem() if defined", function() {
      // no-op onSelectItem
      singleselect.onDeselectItem = function() {};
      var spy = sinon.spy(singleselect, 'onDeselectItem'); 

      singleselect.deselectItem(selectable);
      expect(singleselect.onDeselectItem).to.have.been.calledWith(selectable);
    });

    describe("when deselecting an item that is not already selected", function() {
      
      it("should not dereference the current selected reference", function() {
        singleselect.deselectItem(selectable2);
        expect(singleselect.selected).to.equal(selectable);
      });

      it("should not call the selectables #deselect() method", function() {
        var spy = sinon.spy(selectable, 'deselect');
        var spy2 = sinon.spy(selectable2, 'deselect');

        singleselect.deselectItem(selectable2);
        expect(selectable.deselect).to.not.have.been.called;
        expect(selectable.deselect).to.not.have.been.called;
      });

      it("should not call #onDeslectItem()", function() {
        //no-op onDeselectItem
        singleselect.onDeselectItem = function() {};
        var spy = sinon.spy(singleselect, 'onDeselectItem');
        
        singleselect.deselectItem(selectable2);
        expect(singleselect.onDeselectItem).to.not.have.been.called;
      })
    });
  });
}); // SingleSelect
