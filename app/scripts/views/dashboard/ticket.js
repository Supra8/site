App.Views = App.Views || {};

(function () {
  'use strict';
  App.Views.Dashboard__Ticket = class Dashboard__Ticket extends Backbone.View {
    template(attrs) {
      return JST['DASHBOARD-TICKET'](attrs);
    }

    tagName() {
      return 'div';
    }

    className() {
      return 'ticket';
    }

    initialize(options) {

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
