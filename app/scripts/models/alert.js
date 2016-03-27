App.Models = App.Models || {};

(function() {
  'use strict';

  App.Models.Alert = class Alert extends Backbone.Model {

    constructor(params) {
      super(params);
    }

    initialize(params) {
      //this.model = App.Models.Alert;
      //this.server = params.server;
    }

    url() {
      return `${API_URL}/server/${this.server.id}/alert`;
    }

  };

})();
