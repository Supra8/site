App.Views = App.Views || {};

(function() {
  'use strict';
  App.Views.Users = class Users extends Backbone.View {
    template(attrs) {
      return JST.USERS(attrs);
    }

    initialize(options) {

    }

    events() {
      return {

      };
    }

    render(event) {
      let that = this;
      this.$el.html(that.template());

      let organisation = new App.Models.Organisation();
      let users = organisation.members();
      users.fetch().then(() => {
        users.each((user) => {
          let userHtml = new App.Views.Users__User({
            model: user
          }).render().el;
          $('.users .users-container', that.$el).append(userHtml);
        });
      });
    }
  };
})();
