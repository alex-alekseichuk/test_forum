
define([
	'backbone',
	'models/MessageItem'
], function (Backbone, MessageItem) {
	'use strict';

	return Backbone.Collection.extend({
		model: MessageItem,
		url: 'api/messages/list'
	});
});
