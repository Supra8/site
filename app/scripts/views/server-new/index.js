App.Views = App.Views || {};

(function() {
  'use strict';
  App.Views.ServerNew = Backbone.View.extend({

    template: JST['SERVER-NEW'],

    tagName: 'div',

    id: '',

    className: '',

    events: {
      "submit .server-new-form": "submit"
    },

    submit: function(event) {
      event.preventDefault();
      $.post(`${API_URL}/server`, {
        name: event.target.name.value,
        description: event.target.description.value
      }, (data) => {
      	/* use curl if yum */
        $('.server-new.app-view').text(`wget -O - https://raw.githubusercontent.com/awo-io/m8/master/scripts/awo-m8_linux.install | bash -s ${data._id} ${data.keys.symmetric}`);
      });
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());

    }
  });
})();
