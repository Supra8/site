/*global App, Backbone*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

    App.Collections.Servers = Backbone.Collection.extend({

        url: API_URL + "/server",
        model: App.Models.Server,

        parse: function(response, options) {
          return response;
        }

    });

})();
