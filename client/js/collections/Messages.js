
define([
	'backbone',
	'models/Message'
], function (Backbone, Message) {
	'use strict';

	return Backbone.Collection.extend({
		model: Message,
		url: 'api/messages/list'
	});
});
