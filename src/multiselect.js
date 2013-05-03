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
    selected: [],

    isItemSelected: function(item) {
      var index = this.selected.indexOf(item);
      
      if (index >= 0) return true;
      return false
    },
    
    selectItem: function(item) {
      if (this.isItemSelected(item)) return;

      this.selected.push(item);
      item.select();   

      if (typeof this.onSelectItem === 'function')
        this.onSelectItem(item);
    },

    deselectItem: function(item) {
      var index = this.selected.indexOf(item);
      if (index < 0) return; // item is not selected, so can't deselect anyways 

      this.selected.splice(index, 1);
      item.deselect(); 

      if (typeof this.onDeselectItem === 'function')
        this.onDeselectItem(item);
    }
  }

}).call(this);
