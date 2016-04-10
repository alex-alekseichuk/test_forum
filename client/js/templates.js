
define(function (require) {
    'use strict';

    return {
      message: require('tpl!templates/message.html'),
      menuItem: require('tpl!templates/menuItem.html'),
      messages: require('tpl!templates/messages.html'),
      messagesItem: require('tpl!templates/messagesItem.html'),
      messageCreate: require('tpl!templates/messageCreate.html')
    };
});
