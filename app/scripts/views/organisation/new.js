App.Views = App.Views || {};

(function() {
  'use strict';
  App.Views.OrganisationNew = Backbone.View.extend({

    template: JST['ORGANISATION-NEW'],

    tagName: 'div',

    id: '',

    className: '',

    events: {
      'submit .organisation-new-form': 'submit'
    },

    submit: function(event) {
      event.preventDefault();
      let that = this;
      $.post(`${API_URL}/organisation`, {
        name: event.target.name.value
      }, (data) => {

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
