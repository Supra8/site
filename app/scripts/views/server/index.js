App.Views = App.Views || {};

(function() {
  'use strict';
  App.Views.Server = class Server extends Backbone.View {
    template(attrs) {
      return JST.SERVER(attrs);
    }

    initialize(options) {
      this.timespan = 1;
      this.type = 'mean';
      this.period = {
        unit: 'days',
        to: moment().unix(),
        from: moment().subtract(this.timespan, 'days').unix()
      };
      $(window).scroll(this.scroll);
    }

    scroll() {
      if ($(window).scrollTop() >= 24) {
        $('#app-view > div').addClass('scrolling');
      } else {
        $('#app-view > div').removeClass('scrolling');
      }
    }

    _close() {
      $(window).off('scroll', this.scroll);
    }

    events() {
      return {
        'click .zoom .option': 'changeZoom',
        'click .type .option': 'changeType'
      };
    }

    changeType(event) {
      event.preventDefault();
      this.type = $(event.currentTarget).attr('value');
      this.render();
    }

    changeZoom(event) {
      event.preventDefault();
      this.timespan = parseInt($(event.currentTarget).attr('value'))
      this.period = {
        unit: 'days',
        to: moment().unix(),
        from: moment().subtract(this.timespan, 'days').unix()
      };
      this.render();
    }

    render() {
      let that = this;
      this.model.fetch().then((model) => {
        this.period.from = moment.unix(this.period.from) / 1000; //.hour(0).minute(0).second(0).unix();
        this.period.to = moment.unix(this.period.to) / 1000; //.hour(23).minute(59).second(59).unix();

        let metrics = new App.Collections.Metrics({
          server: that.model,
          period: that.period,
          type: that.type
        });

        that.$el.html(that.template(_.extend(model, {
          timespan: that.timespan,
          type: that.type
        })));

        riot.mount('sub-navigation', {
          model: that.model,
          submenu: App.Views.Server.submenu
        });

        metrics.fetch().then((data) => {
          let timeSeries = _.map(data, 'unix');
          riot.mount('line-chart', {
            data,
            timeSeries
          });
        });
      });
    }
  };
})();
