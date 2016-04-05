App.Views = App.Views || {};

(function () {
  'use strict';
  App.Views.Servers__Server = class Servers__Server extends Backbone.View {
    template(attrs) {
      return JST["SERVERS-SERVER"](attrs);
    }

    tagName() {
      return 'tr';
    }

    className() {
      let diff = moment().diff(new Date(this.model.get('lastFeedback')), 'seconds');
      this.model.set('available', diff < 120 ? true : false);
      return `server ${this.model.get('available') === true ? 'available' : 'unavailable'}`;
    }

    initialize(options) {

    }

    events() {
      return {
        'click .toggleSubscription': 'toggleSubscription'
      };
    }

    toggleSubscription(event) {
      event.preventDefault();
      let that = this;
      let subscribed = that.model.get('subscribed');
      this.model.toggleSubscription()
        .then(() => {
          that.model.set('subscribed', !subscribed);
          that.render();
        })
        .catch();
    }

    render() {
      this.$el.html(this.template(_.extend(this.model.toJSON(), {
        latest: '0.1.0'
      })));
      return this;
    }
  };
})();
