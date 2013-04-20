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
      item.select(); 
    }
  }

}).call(this);
