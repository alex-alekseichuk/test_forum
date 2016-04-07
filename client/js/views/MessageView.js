
define([
    'marionette',
    'templates',
    'models/Message'
], function (Marionette, templates) {
    'use strict';

    return Marionette.ItemView.extend({
        template: templates.message,

        initialize: function (model) {
          this.mode = 'view';
          this.model.fetch();
        },

        ui: {
            link: 'a'
        },

        events: {
            'click #btnEdit': 'onEdit',
            'click #btnSave': 'onSave',
            'click #btnCancel': 'onCancel'
        },

        modelEvents: {
            "change": function() {
                this.render();
            }
        },

        onEdit: function() {
            if (this.mode === 'edit')
                return;
            this.mode = 'edit';
            this.$('#title').val(this.model.get('title'));
            this.$('#text').val(this.model.get('text'));
            this.$('#frmMessage').show();
            this.$('#view').hide();
        },
        onSave: function() {
            var view = this;
            if (this.mode === 'view')
                return;
            var title = this.$('#title').val();
            if (title.trim().length === 0) {
              alert("Title can't be empty.");
              return;
            }
            var text = this.$('#text').val();
            if (text.trim().length === 0) {
                alert("Text can't be empty.");
                return;
            }

            this.model.save({title: title, text: text}, {
                success: function (model, response) {
                    view.mode = 'view';
                    view.$('#frmMessage').hide();
                    view.$('#view').show();
                },
                error: function (model, response) {
                    alert("Can't save message");
                },
                wait: true
            });
        },
        onCancel: function() {
            if (this.mode === 'view')
                return;
            this.mode = 'view';
            this.$('#frmMessage').hide();
            this.$('#view').show();
        }

    });
});
