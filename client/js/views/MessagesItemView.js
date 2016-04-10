
define([
	'marionette',
	'templates',
    'models/MessageItem'
], function (Marionette, templates, MessageItem) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.messagesItem,
    tagName: 'tr',
    model: MessageItem,

    ui: {
      link: 'a'
    },

    events: {
      'click': 'showMessage'
    },

    showMessage: function() {
      window.app.execute('app:message', {id: this.model.get('id')});
    }

  });
});
