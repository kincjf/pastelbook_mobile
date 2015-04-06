/*global define */
/**
 * Image 삽입을 위한 Behavior
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 *
 */
define([
  'marionette'
], function (Marionette) {
  'use strict';

  return Marionette.Behavior.extend({
     defaults: {
        type: 'image',
        imgSrc: "./image/dummy.png"
     },

     onAddImage: function (imageOptions) {
        myLogger.trace("AddImageBehavior - addImage");

        /** this.collection : BaseObjectList
         * change .create() to .add()
         */
        this.view.collection.push({
           type: this.options.type,
           src: imageOptions.imgSrc,
           top: imageOptions.top,     // y
           left: imageOptions.left,     // x
           width: imageOptions.width,
           height: imageOptions.height
        });

        //pb.app_tool.vent.trigger("save:thumbnail", this.view.sceneViewSet);
     }
  });
});
