define([
    'marionette',
    'templates',
    'models/Message'
], function (Marionette, templates, Message) {
    'use strict';

    return Marionette.ItemView.extend({
        template: templates.messageCreate,

        initialize: function (model) {
          this.model = new Message();
        },

        events: {
            'click #btnSave': 'onSave',
            'click #btnCancel': 'onCancel'
        },

        onSave: function() {
            var view = this;

            var title = this.$('#title').val();
            if (title.trim().length === 0) {
                alert("Message title can't be empty.");
                return;
            }

            var text = this.$('#text').val();
            if (text.trim().length === 0) {
                alert("Message text can't be empty.");
                return;
            }

            this.model.save({title: title, text: text}, {
                success: function (model, response) {
                  window.app.commands.execute('app:messages');
                },
                error: function (model, response) {
                    alert("Can't save message");
                },
                wait: true
            });
        },
        onCancel: function() {
            window.app.commands.execute('app:messages');
        }

    });
});
