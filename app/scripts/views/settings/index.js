App.Views.Settings = Backbone.View.extend({

  template: JST['SETTINGS'],

  title: 'Einstellugnen',

  events: {
    'click #invite-user-form-submit': 'invite'
  },

  initialize: function () {

  },

  render: function () {
    this.$el.html(this.template({

    }));
  },

  invite: function (event) {
    let that = this;
    event.preventDefault();

    $.post(`${API_URL}/account`, {
      firstName: $('#first-name', that.$el).val(),
      name: $('#first-name', that.$el).val(),
      email: $('#email', that.$el).val(),
      language: 'de'
    }, function (Data) {
      console.log(Data);
    });
  }

});
