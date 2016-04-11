App.Collections = App.Collections || {};

(function() {
  'use strict';
  App.Collections.Metrics = class Metrics extends Backbone.Collection {
    constructor(params) {
      super(params);
    }

    initialize(params) {
      this.model = App.Models.Metric;
      this.server = params.server;
      this.period = params.period;
      this.type = params.type;
      let chartWidth = $('#app-view').width() / 2;
      let periodUnit = moment.unix(this.period.to).diff(moment.unix(this.period.from), this.period.unit);
      this.groupBy = parseInt((chartWidth + 350 * 1000) / chartWidth) * parseInt(periodUnit / 24);
      this.groupBy = this.groupBy <= 180 ? 180 : this.groupBy;
    }

    url() {
      return `${API_URL}/server/` +
        `${this.server.id}/metrics/` +
        `${this.type}/` +
        `${this.period.from}/` +
        `${this.period.to}/` +
        `${this.groupBy}`;
    }

    validate(attrs, options) {

    }

    parse(response, options) {
      _.map(response, (doc) => {
        doc._id *= 1000;
      });
      return response;
    }
  };
})();
