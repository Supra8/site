App.Views = App.Views || {};

(function () {
  'use strict';
  App.Views.Dashboard = class Dashboard extends Backbone.View {
    template(attrs) {
      return JST.DASHBOARD(attrs);
    }

    initialize(options) {
      
    }

    events() {
      return {

      };
    }

    render() {
      this.$el.html(this.template());
    }
  };
})();
