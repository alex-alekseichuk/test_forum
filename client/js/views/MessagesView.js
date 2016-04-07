define([
    'marionette',
    'templates',
    'collections/Messages',
    'views/MessagesItemView'
], function (Marionette, templates, Messages, MessagesItemView) {
    'use strict';

    return Marionette.CompositeView.extend({
        childView: MessagesItemView,
        childViewContainer: "tbody",
        template: templates.messages,

        initialize: function() {
            var view = this;
            this.collection = new Messages();
            this.collection.fetch({success: function() {
                view.render();
            }});
        }
    });

});
