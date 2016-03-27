App.Views.ServerList = Backbone.View.extend({

	template: window["JST"]["SERVER-LIST"],

	title: "Serverliste",

	events: {

	},

	render: function () {

		$("#app-view-title").text(this.title);

		var that = this;
		var servers = new Servers();
		servers.fetch(function (fetchedServers) {

			that.$el.html(that.template({
				Servers: fetchedServers
			}));

			_.each(fetchedServers, function (Server) {
				var ServerItem = new App.Views.ServerListItem({
					model: Server
				});
				$("#server-list").append(ServerItem.render().el);
				new App.Graphs["CPULoadServerMini"]("server-list-item-" + Server.Id);
			});
		});
		return that;
	}

});

App.Views.ServerListItem = Backbone.View.extend({

	template: window["JST"]["SERVER-LIST-ITEM"],

	tagName: "tr",

	className: "server",

	events: {

	},

	render: function () {
		this.$el.html(this.template({
			Server: this.model
		}));
		return this;
	}

});