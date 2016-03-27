/*global App, Backbone*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

    App.Collections.Users = Backbone.Collection.extend({

        url: API_URL + "/organisation/members",
        model: App.Models.User,

        parse: function(response, options) {
          return response.members;
        }

    });

})();
