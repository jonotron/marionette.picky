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

  }

}).call(this);
