
define([
    'marionette',
    'templates',
    'models/Article'
], function (Marionette, templates) {
    'use strict';

    return Marionette.ItemView.extend({
        template: templates.promo,
        tagName: 'div',

        initialize: function () {
        },

        modelEvents: {
            "change": function() {
                this.render();
            }
        },

        onBeforeRender: function() {
            var n = 10;
            var brief = this.model.get('content');
            if (brief.length > n) {
                brief = brief.substring(0, brief.lastIndexOf(' ', n)) + '...';
            }
            this.model.set('brief', brief);
        }
    });
});
