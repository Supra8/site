App.Models = App.Models || {};

(function () {
  'use strict';
  App.Models.Ticket = Backbone.Model.extend({
    url: '',
    defaults: {},
    validate: (attrs, options) => {},
    parse: (response, options) => {
      return response;
    }
  });
})();
