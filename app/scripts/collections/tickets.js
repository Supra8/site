/*global App, Backbone*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

    App.Collections.Tickets = Backbone.Collection.extend({

        url: API_URL + "/ticket",
        model: App.Models.Ticket,

        parse: function(response, options) {
          return response;
        }

    });

})();
