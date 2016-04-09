App.Views = App.Views || {};

(function () {
  'use strict';

  App.Views.SidebarServerList = Backbone.View.extend({

    tagName: "ul",
    className: "servers",

    template: window["JST"]["SIDEBAR-SERVER-LIST"],

    render: function () {
      let that = this;
      let servers = new App.Collections.Servers();
      servers.fetch().then(() => {
        servers.forEach((server) => {
          $.get(`${API_URL}/server/${server.id}/metrics/latest/1`, (data) => {
            let running = false;
            if (data.length === 1) {
              let timeDiff = Date.now() - Date.parse(data[0].createdAt);
              if (timeDiff < 60 * 1000 * 1.1) {
                running = true;
              }
            }
            let serverItem = new App.Views.SidebarServerItem({
              model: server.attributes,
              running: running
            });
            that.$el.append(serverItem.render().el);
          });
        });

        that.$el.append("<li><a class='button button-primary' href='/server/add'>Add new server</a></li>");
      });
      return that;
    }
  });

  App.Views.SidebarServerItem = Backbone.View.extend({
    tagName: "li",
    className: "server",
    events: {},

    template: window["JST"]["SIDEBAR-SERVER-ITEM"],

    initialize: function (params) {
      this.on("change", this.render, this);
      this.running = params.running;
    },

    render: function () {
      this.$el.html(this.template(_.extend(this.model, {
        running: this.running
      })));
      return this;
    }
  });
})();
