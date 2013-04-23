(function() {
  
  // store a reference to the global object
  var root = this;

  var PickleMixins;
  var MultiSelect;

  if (typeof exports !== 'undefined') {
    // just export SingleSelect
    MultiSelect = exports; 
  } else {
    // install PickleMixins if not already defined on the global object
    PickleMixins = root.PickleMixins = root.PickleMixins || {};
  }

  MultiSelect = PickleMixins.MultiSelect = {
    selectedLength: 0,
    selected: [],

    selectItem: function(item) {
      // escape early if we try to select something already selected
      if (this.selected === item) return;

      // deselect previously selected
      if (this.selected) this.selected.deselect();

      this.selected = item;
      item.select(); 

      if (typeof this.onSelectItem === 'function')
        this.onSelectItem(item);
    },

    deselectItem: function(item) {
      if (this.selected !== item) return;

      this.selected = null;
      item.deselect();

      if (typeof this.onDeselectItem === 'function')
        this.onDeselectItem(item);
    }
  }

}).call(this);
