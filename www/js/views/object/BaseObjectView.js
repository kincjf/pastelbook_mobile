/* global define */
/**
 * Scene을 구성하는 개별화면
 *
 * - 구현내용/순서
 * 1. 추가요소(BaseObject) 삽입 => (구현중)
 */
define([
	'marionette',
	"js/common/GestureHelper",
	"hammer"
], function (Marionette, GestureHelper, Hammer) {
	'use strict';

	var BaseObjectView = Marionette.ItemView.extend({
		tagName: "div",

		ui: {
			removeButton: "button[data-behavior='remove']"
			// object 삭제
		},     // 다른 Object들과 extend됨.

		/**
		 * - 어미에 Data가 붙은 것은 model Data를 직접 변경하는 것이고,
		 * 붙지 않은 것은 View(DOM)만 변경하는 것임.
		 *
		 * - 양방향 바인딩을 이용하여 Model을 변경한 후 바로 View에 적용되게 할 수 있지만,
		 * 1. 불필요하게 model data 접근하여 많은 연산이 수행되게 할 수 있음.
		 * 2. 향후 model data를 이용한 기능 구현(undo, redo, 자동저장, 공동작업등)시 문제가 생길 우려
		 * 때문에 조작중에는 직접 View에 접근하고 조작이 끝나는 시점에서는 데이터를 변경하게 구현함.
		 *
		 * - interact 이벤트가 eventhash에 먹히지 않음 그래서 수동으로 설정함
		 * - [un]selected:baseobject : 선택된 View의 instance를 pb.current.selectedBaseObject에 삽입/삭제한다.
		 */
		events: {
			'tap @ui.removeButton': 'removeObject'
		},

		className: "object",

		initialize: function () {
			myLogger.trace("BaseObjectView - initialize");
		},

		// "render" / onRender - after everything has been rendered
		onRender: function () {
			// 좀비뷰가 되지 않기 위해서는 custom event를 삭제해야함.
			myLogger.trace("BaseObjectView - onRender");

			var gestureOptions = {
				el: this.el
			};

			_.extend(this, GestureHelper);

			this.setGesture(gestureOptions);

			this.gestureManager = new Hammer.Manager(gestureOptions.el);

			this.gestureManager.add(new Hammer.Pan({
				threshold: 0,
				pointers: 0
			}));
			this.gestureManager.add(new Hammer.Rotate({
				threshold: 0
			})).recognizeWith(this.gestureManager.get('pan'));
			this.gestureManager.add(new Hammer.Pinch({
				threshold: 0
			})).recognizeWith([this.gestureManager.get('pan'), this.gestureManager.get('rotate')]);
			this.gestureManager.add(new Hammer.Tap());

			// hammer event는 기본 event가 아니기 때문에 event hash가 적용되지 않음
			this.gestureManager.on("panstart panmove", this.moveObject);
			this.gestureManager.on("rotatestart rotatemove", this.rotateObject);
			this.gestureManager.on("pinchstart pinchmove", this.pinchObject);
			this.gestureManager.on("tap", this.tapObject);

			this.gestureManager.on("hammer.input", function(event) {
				if(event.isFinal) {
					//	canvas 변경, 미리보기 변경
				}
			});
		},

		// Marionette Override Methods

		onShow: function () {
			myLogger.trace("BaseObjectView - onShow");
		},

		/** modify selectable variable, preview image */
		onDomRefresh: function () {
			myLogger.trace("BaseObjectView - onDomRefresh");
		},

		onBeforeDestroy: function () {
			myLogger.trace("BaseObjectView - onBeforeDestroy");
		},

		onDestroy: function () {
			myLogger.trace("BaseObjectView - onDestroy");
		},

		// Custom Methods - Event Callback
		moveObject: function(event) {
			this.onPan(event);
		},

		/** 썸네일 구동 시기
		 * 1. Scene 추가시, Project 로딩시
		 * - onRender에서 해결
		 * 2. BaseObject 추가/삭제
		 * - messaging OR listenTo(add|remove)로 해결
		 * 3. BaseObject 수정
		 * - messaging call로 해야될 것 같음.
		 */
		changePreview: function() {
			myLogger.trace("BaseObjectView - changePreview");
			pb.app_tool.vent.trigger("save:thumbnail", this.options.sceneViewSet);
		},

		/** 'click .destroyBtn' */
		destroyObject: function (event, ui) {

		},

		/** 'click .rotateBtn' */
		rotateObject: function () {

		},

		// Custom Methods - contextMenu Callback
		addMyContents: function () {
			myLogger.trace("BaseObjectView - addMyContents");
		},

		/** 바인딩된 모든 이벤트를 해제하고 난 후에 데이터를 삭제함. */
		deleteObject: function (key, opt) {
			/** this.model - BaseObject, this.model.collection - BaseObjectList */
			this.model.collection.remove(this.model);

			/** reset시 계속 repaint를 하기 때문에 onDestroy에 선언하지 않음 */
			this.changePreview();
			myLogger.trace("BaseObjectView - deleteObject");
		},

		cutObject: function () {
			myLogger.trace("BaseObjectView - cutObject");
		},

		copyObject: function () {
			myLogger.trace("BaseObjectView - copyObject");
		},

		pasteObject: function () {
			myLogger.trace("BaseObjectView - pasteObject");
		},

		moveForegroundObject: function () {
			myLogger.trace("BaseObjectView - moveForegroundObject");
		},

		moveForwardObject: function () {
			myLogger.trace("BaseObjectView - moveForwardObject");
		},

		moveBackgroundObject: function () {
			myLogger.trace("BaseObjectView - moveBackgroundObject");
		},

		moveBackwardObject: function () {
			myLogger.trace("BaseObjectView - moveBackwardObject");
		},

		editSizePositionObject: function () {
			myLogger.trace("BaseObjectView - editSizePositionObject");
		},

		editShapeObject: function () {
			myLogger.trace("BaseObjectView - editShapeObject");
		}
	});

	return BaseObjectView
});
