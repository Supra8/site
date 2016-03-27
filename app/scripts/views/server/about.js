App.Views = App.Views || {};

(function () {
  'use strict';
  App.Views.Server__About = Backbone.View.extend({

    template: JST['SERVER-ABOUT'],

    tagName: 'div',

    id: '',

    className: '',

    events: {

    },

    initialize: function () {

    },

    render: function () {
      let that = this;
      this.model.fetch().then((model) => {
        this.$el.html(this.template(model));
        riot.mount('sub-navigation', {
          model: that.model,
          submenu: App.Views.Server.submenu
        });
      });
    }
  });
})();
