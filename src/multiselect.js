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
      // loop over the selected list and see if item is in it
      for(var i = 0; i <= this.selected.length; i++) {
        if (this.selected[i] === item) return true;
      } 

      return false;
    },
    
    selectItem: function(item) {
      if (this.isItemSelected(item)) return;

      this.selected.push(item);
      item.select();   

      if (typeof this.onSelectItem === 'function')
        this.onSelectItem(item);
    }
  }

}).call(this);
