App.Views = App.Views || {};

(function () {
  'use strict';

  App.Views.Account = Backbone.View.extend({

    template: window["JST"]["ACCOUNT"],

    title: "Ihr Account",

    events: {
      "click #save-new-account-settings": "save"
    },

    save: function (event) {
      event.preventDefault();
      location.reload();
    },

    initialize: function () {

    },

    render: function () {
      $("#app-view-title").text(this.title);
      this.$el.html(this.template(My));
    }

  });
})();
