/*global define */
/**
 * VideoView extends BaseObjectView
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 *
 */
define([
   'marionette',
   'pb_templates',
   'BaseObjectView',
   'videojs'
], function (Marionette, templates, BaseObjectView, videojs) {
   'use strict';

   return BaseObjectView.extend({
      tagName: 'div',

      template: templates.VideoView,

      ui: {
         video: "video"
      },

      events: {
         //'dblclick img': 'editVideo'
      },

      attributes: {
         'type': 'video'
      },

      className: BaseObjectView.prototype.className,

      initialize: function (options) {
         BaseObjectView.prototype.initialize.call(this, options);
         myLogger.trace("VideoView - init");

         _.extend(this.events, BaseObjectView.prototype.events);
         _.extend(this.ui, BaseObjectView.prototype.ui);

         this.videoContextMenus = [
            {
               name: "ChangeVideo",
               fun: this.changeVideo
            },
            {
               name: "editVideo",
               fun: this.editVideo
            }
         ];
      },

      // "show" / onShow - Called on the view instance when the view has been rendered and displayed.
      onShow: function (v) {
         BaseObjectView.prototype.onShow.call(this);

         this.$el.contextMenu(
            _.union(this.objectContextMenus, this.videoContextMenus),
            this.contextMenuOptions);

         myLogger.trace("VideoView - onShow");
      },

      // "render" / onRender - after everything has been rendered
      onRender: function (v) {
         BaseObjectView.prototype.onRender.call(this);

         this.videoInstance = videojs(this.ui.video[0], {}, function() {
            console.log("video init");
         });

         this.$el.css({
            width: this.model.get("width"),
            height: this.model.get("height")
         });

         this.ui.video.parent().css({
            width: "inherit",
            height: "inherit"
         });

         myLogger.trace("VideoView - onRender");
      },

      onBeforeDestroy: function() {
         BaseObjectView.prototype.onBeforeDestroy.call(this);
      },

      changeVideo: function() {
         myLogger.trace("VideoView - changeVideo");
      },

      editVideo: function() {
         myLogger.trace("VideoView - editVideo");
      }
   });
});
