App.Views.ServerMenu = Backbone.View.extend({

  template: window["JST"]["SERVER-MENU"],

  initialize: function() {

  },

  render: function(Parameter) {
    this.$el.html(this.template({
      Server: this.model
    }));
    return this;
  }
});
