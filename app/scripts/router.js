$(function () {
  "use strict";

  const $el = $('#app-view');
  let params = {
    el: $el
  };

  Backbone.View.prototype.dispose = function () {
    this.undelegateEvents();
    this.stopListening();
    this.unbind();

    /* Custom dispose function. */
    if (_.isFunction(this._close)) {
      this._close();
    }
  };

  Backbone.History.prototype.navigate = _.wrap(Backbone.History.prototype.navigate, function () {
    let args = _.toArray(arguments);
    Backbone.history.trigger('url-changing', args);
    let res = args.shift().apply(this, args);
    Backbone.history.trigger('url-changed');
    return res;
  });

  App.Router = Backbone.Router.extend({

    tmpView: null,

    initialize: function () {
      this.bind('route', () => {
        if (window.ga) {
          let path = Backbone.history.getFragment();
          _.defer(window.ga, 'send', 'pageview', {
            page: '/' + path,
            title: ''
          });
        }
      });
    },

    routes: {
      '': function () {
        router.navigate('//servers', {
          trigger: true
        });
        return true;

        this.tmpView = new App.Views.Dashboard(params);
        this.tmpView.render();
      },

      /*'account': function () {
        this.tmpView = new App.Views.Account(params);
        this.tmpView.render();
      },*/

      'settings': function () {
        this.tmpView = new App.Views.Settings(params);
        this.tmpView.render();
      },

      'servers': function () {
        this.tmpView = new App.Views.Servers(params);
        this.tmpView.render();
      },

      'server/new': function () {
        this.tmpView = new App.Views.ServerNew(params);
        this.tmpView.render();
      },

      'server/:id([a-f0-9]+)': function (id) {
        let model = new App.Models.Server({
          id
        });
        this.tmpView = new App.Views.Server(_.extend(params, {
          model
        }));
        this.tmpView.render();
      },
      'server/:id([a-f0-9]+)/about': function (id) {
        let model = new App.Models.Server({
          id
        });
        this.tmpView = new App.Views.Server__About(_.extend(params, {
          model
        }));
        this.tmpView.render();
      },
      'server/:id([a-f0-9]+)/alerts': function (id) {
        let model = new App.Models.Server({
          id
        });
        this.tmpView = new App.Views.Server__Alerts(_.extend(params, {
          model
        }));
        this.tmpView.render();
      },
      'server/:id([a-f0-9]+)/settings': function (id) {
        let model = new App.Models.Server({
          id
        });
        this.tmpView = new App.Views.Server__Settings(_.extend(params, {
          model
        }));
        this.tmpView.render();
      },

      'organisation/new': function () {
        this.tmpView = new App.Views.OrganisationNew(params);
        this.tmpView.render();
      },

      'users': function (id) {
        this.tmpView = new App.Views.Users(params);
        this.tmpView.render();
      },

      'feedback': function () {
        location = 'https://github.com/enginsight/issues/issues';
      },

      /* If there is no route matching, just navigate back. */
      '*path': function () {
        alert("Route not found!");
        Backbone.history.history.back();
      }
    }
  });

  var router = new App.Router();
  Backbone.history.bind('url-changing', function (path, e) {
    if (router.tmpView && _.isFunction(router.tmpView.unbind)) {
      router.tmpView.dispose();
    }
  });

  Backbone.history.bind('url-changed', function (path, e) {});

  Backbone.history.start({
    root: `${location.pathname}`
  });

  /* http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/ */
  $(document).on('click', 'a[href^="/"]', (event) => {
    let href, passThrough, url;
    href = $(event.currentTarget).attr('href');

    /* Ausnahmen */
    passThrough = href.indexOf('logout') >= 0;

    /* Allow shift+click for new tabs, etc. */
    if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      url = href.replace(/^\//, '//'); //.replace('\#\!\/', '');
      router.navigate(url, {
        trigger: true
      });
      return false;
    }
  });
});
