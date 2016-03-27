App.Views = App.Views || {};

(function () {
  'use strict';
  App.Views.Users__User = class Users__User extends Backbone.View {
    template(attrs) {
      return JST["USERS-USER"](attrs);
    }

    initialize(options) {

    }

    tagName() {
      return 'div';
    }

    className() {
      return 'user';
    }

    events() {
      return {

      };
    }

    render() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  };
})();
