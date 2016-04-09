App.Views = App.Views || {};

(function() {
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

    fetch() {
      let tickets = new App.Collections.Tickets();
      let servers = new App.Collections.Servers();
      return new Promise((resolve, reject) => {
        Promise.all([
          tickets.fetch(),
          servers.fetch()
        ]).then((data) => {
          resolve({
            tickets,
            servers
          });
        }).catch((err) => reject(err));
      });
    }

    render() {
      let that = this;
      this.fetch().then((models) => {
        let tickets = models.tickets;
        this.$el.html(this.template(models));
        tickets.where({resolved: false}).forEach((ticket) => {
          let ticketHTML = (new App.Views.Dashboard__Ticket({
            model: ticket
          })).render().el;
          $('.tickets .open-list', that.$el).append(ticketHTML);
        });
      });
    }
  };
})();
