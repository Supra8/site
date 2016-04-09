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
        tickets.where({
          resolved: false
        }).forEach((ticket) => {
          let ticketHTML = (new App.Views.Dashboard__Ticket({
            model: ticket
          })).render().el;
          $('.tickets .open-list', that.$el).append(ticketHTML);
        });
        let data = _.map(tickets.models, (ticket) => ticket.attributes);
        let group = _.groupBy(data, function(ticket) {
          return (new Date(ticket.createdAt)).toLocaleDateString();
        });
        riot.mount('stacked-bar-chart', {
          data: _.map(_.keys(group), function(key) {
            return {
              date: new Date(group[key][0].createdAt) * 1,
              value: group[key].length
            };
          })
        });
      });
    }
  };
})();
