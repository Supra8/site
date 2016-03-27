/*global App, Backbone*/

App.Collections = App.Collections || {};

(function() {
  'use strict';

  App.Collections.Alerts = class Alerts extends Backbone.Collection {

    constructor(params) {
      super(params);
    }

    initialize(params) {
      this.model = App.Models.Alert;
      this.server = params.server;
    }

    url() {
      return `${API_URL}/server/${this.server.id}/alerts`;
    }

  };

})();
