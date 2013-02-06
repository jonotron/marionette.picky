Backbone.Marionette.Picky.Selectable = (function (Backbone, _) {
  var Selectable = {};
  _.extend(Selectable.prototype, {
    selected: false, 

    select: function() {
      if (this.selected) { return ;}

      this.selected = true;
      this.trigger('selected', this);
    },

    deselect: function() {
      if (!this.selected) { return; }

      this.selected = false;
      this.trigger('deselected', this);
    },

    toggleSelected: function() {
      if (this.selected) {
        this.deselect();
      } else {
        this.select();
      }
    }
  });

  return Selectable;
});
