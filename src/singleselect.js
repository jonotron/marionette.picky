(function() {
  
  // store a reference to the global object
  var root = this;

  var PickleMixins;
  var SingleSelect;

  if (typeof exports !== 'undefined') {
    // just export SingleSelect
    SingleSelect = exports; 
  } else {
    // install PickleMixins if not already defined on the global object
    PickleMixins = root.PickleMixins = root.PickleMixins || {};
  }

  SingleSelect = PickleMixins.SingleSelect = {
    selectedLength: 0,
    selected: null,

    selectItem: function(item) {
      // escape early if we try to select something already selected
      if (this.selected === item) return;

      // deselect previously selected
      if (this.selected) this.selected.deselect();

      this.selected = item;
      item.select(); 

      if (typeof this.onSelectItem === 'function')
        this.onSelectItem(item);
    }
  }

}).call(this);
