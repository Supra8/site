App.Views = App.Views || {};

(function () {
  'use strict';

  App.Views.Server__Settings = Backbone.View.extend({

    template: JST['SERVER-SETTINGS'],

    tagName: 'div',

    id: '',

    className: '',

    events: {
      'click .delete': 'delete',
      'submit .settings-form': 'submit'
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    submit: function (event) {
      event.preventDefault();
      this.model.set($(event.target).serializeObject());
      this.model.update().then((data) => {
        console.log(data);
      });
    },

    render: function () {
      let that = this;
      this.model.fetch().then(() => {
        this.$el.html(this.template(that.model.toJSON()));
      });
    },

    delete: function (event) {
      event.preventDefault();
      this.model.destroy().then((data) => {
        location = '/app#servers';
      });
    }

  });

})();
