/*global define */
/**
 * TextBox 삽입을 위한 Behavior
 *
 */
define([
  'marionette'
], function (Marionette) {
  'use strict';

  return Marionette.Behavior.extend({
     defaults: {
        type: "textbox",
        width: "50px",
        height: "50px",
        htmlString: "Insert Here!"
     },

     onAddTextBox: function (textBoxOptions) {
        myLogger.trace("AddTextBoxBehavior - addTextBox");

        /** this.collection : BaseObjectList
         * change .create() to .add()
         */
        this.view.collection.push({
           type: this.options.type,
           top: textBoxOptions.top,     // x
           left: textBoxOptions.left,     // y
           width: this.options.width,
           height: this.options.height,
           htmlString: textBoxOptions.htmlString || this.options.htmlString
        });

        //pb.app_tool.vent.trigger("save:thumbnail", this.view.sceneViewSet);
     }
  });
});
