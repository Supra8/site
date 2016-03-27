App.Models = App.Models || {};

(function () {
  'use strict';
  App.Models.User = Backbone.Model.extend({
    url: '',
    defaults: {},
    validate: (attrs, options) => {},
    parse: (response, options) => {
      return response;
    }
  });
})();
