App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.Server__Alerts__Alert = Backbone.View.extend({

    template: JST['SERVER-ALERTS-ALERT'],

    tagName: 'div',

    id: '',

    className: 'alert',

    events: {
      'click .delete': 'delete'
    },

    delete: function(event) {
      event.preventDefault();
      console.log()
      $.ajax({
        url: `${API_URL}/server/${this.model.get('clientId')}/alert/${this.model.get('_id')}`,
        type: 'DELETE',
        success: (data) => {
          location.reload();
        }
      });
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

})();
