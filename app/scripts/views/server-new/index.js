App.Views = App.Views || {};

(function() {
  'use strict';
  App.Views.ServerNew = Backbone.View.extend({

    template: JST['SERVER-NEW'],

    tagName: 'div',

    id: '',

    className: '',

    events: {
      'submit .server-new-form': 'submit'
    },

    submit: function(event) {
      event.preventDefault();
      let that = this;
      $.post(`${API_URL}/server`, {
        name: event.target.name.value,
        description: event.target.description.value

      }, (data) => {
        that.undelegateEvents();

        let $publicKey = $('<code class="public-key" />').appendTo(that.$('.server-new.app-view').empty());
        $publicKey.html(`\
server:                                                               <br>\
  adress: 94.186.181.124                                              <br>\
  port: 9150                                                          <br>\
                                                                      <br>\
client:                                                               <br>\
  id: ${data._id}<br>\
  key: !!str | <br>\
    ${data.keys.public.replace(/(?:\r\n|\r|\n)/g, '<br />    ')}`);
      });
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
    }
  });
})();
