App.Views = App.Views || {};

(function() {
  'use strict';

  App.Views.Server__Alerts = Backbone.View.extend({

    template: JST['SERVER-ALERTS'],

    tagName: 'div',

    id: '',

    className: '',

    events: {
      'submit .new-alert-form': 'submit'
    },

    initialize: function() {

    },

    submit: function(event) {
      let that = this;
      event.preventDefault();
      $.post(`${API_URL}/server/${this.model.id}/alert`,
        $(event.target).serializeObject(), (data) => {
          that.renderAlerts();
        });
    },

    render: function() {
      let that = this;
      this.model.fetch().then(() => {
        this.$el.html(this.template(that.model.toJSON()));
        that.renderAlerts();
      });
    },

    renderAlerts: function() {
      $('.alert-list').empty();
      let alerts = new App.Collections.Alerts({
        server: this.model
      });
      alerts.fetch().then(() => {
        alerts.each((alert) => {
          $('.alert-list').append(new App.Views.Server__Alerts__Alert({
            model: alert
          }).render().el);
        });
      });
    }
  });

})();
