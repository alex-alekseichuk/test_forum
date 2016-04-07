
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        url: 'api/messages',

        defaults: {
            title: 'New Message Title',
            text: 'Provide some text...'
        },

        initialize: function () {
            //this.set('content', _.result(templates.pages, this.get('name')));
        }
    });
});
