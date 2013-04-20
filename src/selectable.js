(function() {
  
  // store a reference to the global object
  var root = this;

  var PickleMixins;
  var Selectable;

  if (typeof exports !== 'undefined') {
    // just export Selectable
    Selectable = exports; 
  } else {
    // install PickleMixins if not already defined on the global object
    PickleMixins = root.PickleMixins = root.PickleMixins || {};
  }

  Selectable = PickleMixins.Selectable = {
    selected: false,

    select: function() {
      if (this.selected) { return ; }

      this.selected = true;
      if(typeof this.trigger === 'function')
        this.trigger('selected', this);
      if(typeof this.onSelected === 'function')
        this.onSelected();
    },

    deselect: function() {
      if (!this.selected) { return ; }

      this.selected = false;
      if(typeof this.trigger === 'function')
        this.trigger('deselected', this);
      if(typeof this.onDeselected === 'function')
        this.onDeselected();

    },

    toggleSelected: function() {
      if (this.selected) {
        this.deselect(); 
      } else {
        this.select(); 
      }
    }
  }

}).call(this);
