
define([
	'marionette',
	'templates',
    'models/Message'
], function (Marionette, templates, Message) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.messagesItem,
    tagName: 'tr',
    model: Message,

    ui: {
      link: 'a'
    },

    events: {
      'click a': 'activateMessage'
    },

    activateMessage: function (event) {
      window.app.commands.execute('app:message', this.model);
      //window.app.vent.trigger('app:message', this.model);
      //window.app.main.show(new PageView({model: this.model}));
    }


  });
});
