/*global define */
/**
 * ImageView extends BaseObjectView
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 *
 */
define([
	'marionette',
	'pb_templates',
	'js/views/object/BaseObjectView'
], function (Marionette, templates, BaseObjectView) {
	'use strict';

	return BaseObjectView.extend({
		template: templates.ImageView,
		ui: {
			img: "img"
		},

		events: {
		},

		attributes: {
			// 이미 들어간거이기 떄문에 넣지 말라는 표시임.
			// Scene에 삽입된 개체를 드래그시 계속 삽입되는 버그를 방지하기위한 표시.
			// 삽입되었다는 표시임.
	      'type': 'image'
		},

		className: BaseObjectView.prototype.className,

		initialize: function (options) {
			BaseObjectView.prototype.initialize.call(this, options);
			myLogger.trace("ImageView - init");

			//_.extend(this.events, BaseObjectView.prototype.events);
			//_.extend(this.ui, BaseObjectView.prototype.ui);
		},

		// "show" / onShow - Called on the view instance when the view has been rendered and displayed.
		onShow: function (v) {
			myLogger.trace("ImageView - onShow");
			BaseObjectView.prototype.onShow.call(this);
		},

		// "render" / onRender - after everything has been rendered
		onRender: function (v) {
			myLogger.trace("ImageView - onRender");
			BaseObjectView.prototype.onRender.call(this);
		},

		onBeforeDestroy: function() {
			BaseObjectView.prototype.onBeforeDestroy.call(this);
		}
	});
});
