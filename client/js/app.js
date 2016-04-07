
define([
  'backbone',
  'marionette',
  'collections/Nav',
  'views/MenuView',
  'views/MessagesView',
  'views/MessageCreateView',
  'views/MessageView',
  'models/Message'
], function (Backbone, Marionette, Nav, MenuView, MessagesView, MessageCreateView, MessageView, Message) {
  'use strict';

  var app = new Marionette.Application();
  app.addRegions({
    menu: '#main-nav',
    promo: '#promo',
    main: '#main'
  });

  app.pages = new Nav([
    {title: 'Messages', path: ''},
    {title: 'Create', path: 'message/create'}
  ]);
  var menu = new MenuView({collection: app.pages});

  app.on("start", function(options){
    app.menu.show(menu);
    if (Backbone.history){
      Backbone.history.start();
    }
  });


  var _updateMenu = function(path) {
    var active = menu.collection.findWhere({active: true});
    if (active)
      active.set('active', false);
    active = menu.collection.findWhere({path: path});
    if (active)
      active.set('active', true);
    menu.render();
  };

  app.router = new Marionette.AppRouter({
    controller: {
      showMessages: function() {
        _updateMenu("");
        app.main.show(new MessagesView());
      },
      showCreateMessage: function() {
        _updateMenu("message/create");
        app.main.show(new MessageCreateView());
      },
      showMessage: function(messageId) {
        _updateMenu("message");
        var message = new Message({id:messageId});

        app.main.show(new MessageView({model: message}));
      }
    },
    appRoutes: {
      "": "showMessages",
      "message/create": "showCreateMessage",
      "message/:id": "showMessage"
    }
  });

  app.commands.setHandler("app:messages", function() {
      app.router.options.controller.showMessages();
  });
  app.commands.setHandler("app:message", function(message) {
      app.router.options.controller.showMessage(message.get('id'));
  });

  return window.app = app;
});
