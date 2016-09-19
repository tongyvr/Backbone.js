var app = {

  views: {},

  loadTemplates: function(views, callback) {

    var deferreds = [];

    $.each(views, function(index, view) {
      if (app[view]) {
        deferreds.push($.get('show/' + view + '.html', function(data) {
          app[view].prototype.template = _.template(data);
        }, 'html'));
      } else {
        alert(view + " not found");
      }
    });

    $.when.apply(null, deferreds).done(callback);
  }

};

app.Router = Backbone.Router.extend({

  routes: {
    "":                 "home",
    "about":          "about",
    "profile":          "profile",
    "admin":          "admin"
  },

  initialize: function () {
    app.generalView = new app.generalView();
    $('body').html(app.generalView.render().el);
    $('body').click(function () {
      $('.dropdown').removeClass("open");
    });
    this.$content = $("#content");
  },

  home: function () {
    if (!app.homelView) {
      app.homelView = new app.HomeView();
      app.homelView.render();
    } else {
      console.log('reusing home view');
      app.homelView.delegateEvents();
    }
    this.$content.html(app.homelView.el);
  },

  about: function () {
    if (!app.aboutView) {
      app.aboutView = new app.AboutView();
      app.aboutView.render();
    }
    this.$content.html(app.aboutView.el);
  },

  profile: function () {
    if (!app.profileView) {
      app.profileView = new app.ProfileView();
      app.profileView.render();
    }
    this.$content.html(app.profileView.el);
  },

  admin: function () {
    if (!app.adminView) {
      app.adminView = new app.AdminView();
      app.adminView.render();
    }
    this.$content.html(app.adminView.el);
  }

});

$(document).on("ready", function () {
  app.loadTemplates(["HomeView", "AboutView", "generalView","ProfileView","AdminView"],
  function () {
    app.router = new app.Router();
    Backbone.history.start();
  });
});
