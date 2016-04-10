define([
    'marionette',
    'templates',
    'collections/MessageItems',
    'views/MessagesItemView'
], function (Marionette, templates, MessageItems, MessagesItemView) {
    'use strict';

  var EmptyListItem = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '<td>No messages</td>'
  });

  return Marionette.CompositeView.extend({
    childView: MessagesItemView,
    childViewContainer: "tbody",
    template: templates.messages,
    emptyView: EmptyListItem,

    initialize: function() {
      var view = this;
      this.collection = new MessageItems();
      this.collection.fetch({success: function() {
        view.render();
      }});
    }
  });

});
