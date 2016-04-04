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
      let that = this;
      $.post(`${API_URL}/server`, {
        name: event.target.name.value,
        description: event.target.description.value
      }, (data) => {
        let $publicKey = $('<code class="public-key" />').appendTo(that.$('.server-new.app-view').empty());
        $publicKey.html(`${data.keys.public.replace(/(?:\r\n|\r|\n)/g, '<br />')}`);

        //$('.server-new.app-view').text(`wget -O - https://raw.githubusercontent.com/awo-io/m8/master/scripts/awo-m8_linux.install | bash -s ${data._id} ${data.keys.symmetric}`);
      });
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
