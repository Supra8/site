App.Models = App.Models || {};

(function () {
  'use strict';
  App.Models.Server = Backbone.Model.extend({
    url: function () {
      return `${API_URL}/server/${this.id}`;
    },

    toggleSubscription: function () {
      let that = this, action = null;
      action = this.get('subscribed') === true ? 'unsubscribe' : 'subscribe';
      return new Promise((resolve, reject) => {
        $.post(`${that.url()}/${action}`, () => {
          resolve();
        });
      });
    },

    update: function () {
      let that = this;
      return new Promise((resolve, reject) => {
        if (!that.hasChanged()) {
          resolve(that.toJSON());
        } else {
          $.ajax({
            url: that.url(),
            type: 'put',
            dataType: 'json',
            data: that.changedAttributes(),
            success: (data) => {
              resolve(data);
            }
          });
        }
      });
    },

    guessOS: function (model) {
      let isSet = false;
      let linux = model.specs.os.linux;
      if (linux && linux !== ':::') {
        let version = model.specs.os.linux.split(':')[1];
        linux = linux
          .replace(new RegExp(':', 'g'), ' ')
          .replace(/(?:^|\s)\S/g, function (word) {
            return word;
          })
          .toLowerCase();

        switch (true) {
        case linux.indexOf('centos') !== -1:
          return `CentOS ${version}`;
        case linux.indexOf('ubuntu') !== -1:
          return `Ubuntu ${version}`;
        case linux.indexOf('debian') !== -1:
          return `Debian ${version}`;
        case linux.indexOf('gentoo') !== -1:
          return `Gentoo ${version}`;
        default:
          return linux;
        }
      } else {
        return 'Unknown';
      }
    },

    parse: function (response, options) {
      try {
        response.id = response.id;
        response.name = response.name;
        response.description = response.description || "";
        response.subscribed = response.subscribed || false;
        response.dealer = response.dealer || "";
        response.specs.os.humandReadable = this.guessOS(response);
        response.specs.swap = response.specs.swap || 0;
        response.specs.os.bootTime =
          response.specs.os.bootTime !== 0 ?
          new Date(response.specs.os.bootTime) :
          null;

        response.lastFeedback = response.lastFeedback || new Date(0);
      } catch (ex) {}
      return response;
    }
  });
})();
