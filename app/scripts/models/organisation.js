App.Models = App.Models || {};

(function () {
  'use strict';
  App.Models.Organisation = Backbone.Model.extend({
    url: API_URL + "/organisation/members",
    defaults: {},
    validate: (attrs, options) => {},
    parse: (response, options) => {
      return response;
    },
    members: () => {
      return new App.Collections.Users();
    }
  });
})();
