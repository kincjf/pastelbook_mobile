/* global define */
/**
 * Image 처리시 필요한 기능을 나열한 Controller 역할을 함
 * (UI로써의 역할은 하지 않음)
 */
define([
	'marionette',
	'fabric',
	'pb_templates',
	'js/views/object/BaseObjectView'
], function (Marionette, fabric, templates, BaseObjectView) {
	'use strict';

	return BaseObjectView.extend({
		tagName: 'img',
		template: false,
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

		className: BaseObjectView.prototype.className + " " + "image",

		initialize: function (options) {
			myLogger.trace("ImageView - initialize");
			this.canvas = options.canvas;
			BaseObjectView.prototype.initialize.call(this, options);

			//_.extend(this.events, BaseObjectView.prototype.events);
			//_.extend(this.ui, BaseObjectView.prototype.ui);
		},

		// "show" / onShow - Called on the view instance when the view has been rendered and displayed.
		onShow: function (view) {
			myLogger.trace("ImageView - onShow");

			BaseObjectView.prototype.onShow.call(this);
		},

		// "render" / onRender - after everything has been rendered
		// view - ImageView instance
		// img tag를 이용한 방법은 한 번 클릭을 해야 나오고
		// fromURL을 이용한 방법은 바로 렌더링됨
		// (무슨 차이인지 모르겠음. 아마도 dom기반이라 dom에 뿌려지기 전에 읽어와서 그런 듯 하다.)
		onRender: function (view) {
			myLogger.trace("ImageView - onRender");
			this.el.src = this.model.get("src");

			//this.image = new fabric.Image(this.el, {
			//	left: 100,
			//	top: 100,
			//	width: 100,
			//	height: 100,
			//	angle: 0,
			//	opacity: 0.85
			//});
			//this.canvas.add(this.image);

			var that = this;
			fabric.Image.fromURL('./test/image/my-image.jpg', function(imgInstance) {
				that.image = imgInstance;

				that.image.on(pb.event.selected.default, _.bind(function(event) {
					// 현재 선택된 object(view)를 지정함 (mobile버전 : 하나만 선택할 수 있음)
					pb.current.object = that;
				}, that));

				that.canvas.add(that.image);
			});
			BaseObjectView.prototype.onRender.call(this);
		},

		onDomRefresh: function(view) {
			myLogger.trace("ImageView - onDomRefresh");
		},

		onBeforeDestroy: function() {
			BaseObjectView.prototype.onBeforeDestroy.call(this);
		}
	});
});
