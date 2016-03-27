App.Views = App.Views || {};

(function() {
  'use strict';
  App.Views.Servers = class Servers extends Backbone.View {
    template(attrs) {
      return JST.SERVERS(attrs);
    }

    initialize(options) {
      /* Websockets... */
      //this.heartBeat = setInterval(this.renderServers, 30 * 1000);
    }

    _close() {
      //clearInterval(this.heartBeat);
    }

    events() {
      return {
        'click .refresh': 'render'
      };
    }

    renderServers() {
      let that = this;
      let servers = new App.Collections.Server();
      servers.fetch().then(() => {
        $('.servers .servers-container', that.$el).empty();
        servers.each((server) => {
          let serverHtml = new App.Views.Servers__Server({
            model: server
          }).render().el;
          $('.servers .servers-container', that.$el).append(serverHtml);
        });
      });
    }

    render() {
      this.$el.html(this.template());
      this.renderServers();
    }
  };
})();
